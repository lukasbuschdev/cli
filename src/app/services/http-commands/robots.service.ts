import { inject, Injectable } from '@angular/core';
import { UtilsService } from '../utils.service';
import { HttpRequestsService } from '../http-requests.service';
import { RobotsPayload, RobotsSection, typeCommand } from '../../types/types';

@Injectable({ providedIn: 'root' })
export class RobotsService {
  utils = inject(UtilsService);
  httpRequests = inject(HttpRequestsService);

  private readonly PROXY = 'https://proxy.lukasbusch.dev/robots';

  robots(command: string, executedCommands: typeCommand[], currentPathString: string, scrollDown: () => void): void {
    const tokens = command.trim().split(/\s+/);
    const arg = tokens.slice(1).find(t => !t.startsWith('--')) || '';
    const ua = this.extractUa(tokens);
    const rawFlag = tokens.includes('--json'); // keep parity with your whois: --json -> raw passthrough

    if (!arg) {
      executedCommands.push({ command, output: 'robots: usage error: URL or domain required', path: currentPathString });
      scrollDown();
      return;
    }

    executedCommands.push({ command, output: `Fetching robots for ${arg}...\n\n`, path: currentPathString });
    const traceIndex = executedCommands.length - 1;
    this.httpRequests.isFetching = true;

    const url = this.buildProxyUrl(arg, ua, rawFlag);

    if (rawFlag) {
      this.httpRequestRawText(url, executedCommands, traceIndex, scrollDown); // for raw text passthrough
    } else {
      this.httpRequestJsonSummary(url, executedCommands, traceIndex, ua, scrollDown); // for JSON summary
    }
  }

  private httpRequestRawText(url: string, executedCommands: typeCommand[], traceIndex: number, scrollDown: () => void): void {
    this.httpRequests.http
      .get(url, { responseType: 'text' as const })
      .subscribe({
        next: (body: string) => {
          executedCommands[traceIndex].output += body + (body.endsWith('\n') ? '' : '\n');
          this.httpRequests.isFetching = false;
          scrollDown();
        },
        error: (err) => {
          executedCommands[traceIndex].output += `Error (robots): ${err?.error?.error || err?.message || 'Unknown error'}\n`;
          this.httpRequests.isFetching = false;
          scrollDown();
        }
      });
  }

  private httpRequestJsonSummary(url: string, executedCommands: typeCommand[], traceIndex: number, ua: string | null, scrollDown: () => void): void {
    this.httpRequests.http
      .get<RobotsPayload>(url) // default responseType is 'json'
      .subscribe({
        next: (body) => {
          executedCommands[traceIndex].output += this.formatSummary(body, ua || undefined);
          this.httpRequests.isFetching = false;
          scrollDown();
        },
        error: (err) => {
          executedCommands[traceIndex].output += `Error (robots): ${err?.error?.error || err?.message || 'Unknown error'}\n`;
          this.httpRequests.isFetching = false;
          scrollDown();
        }
      });
  }

  private extractUa(tokens: string[]): string | null {
    const m = tokens.join(' ').match(/--ua\s+("[^"]+"|'[^']+'|\S+)/i);
    return m ? m[1].replace(/^['"]|['"]$/g, '') : null;
  }

  private buildProxyUrl(target: string, ua: string | null, raw: boolean): string {
    const p = new URL(this.PROXY);
    p.searchParams.set('url', target);
    if (ua) p.searchParams.set('ua', ua);
    if (raw) p.searchParams.set('raw', '1');
    return p.toString();
  }

  private formatSummary(body: RobotsPayload, ua?: string): string {
    const sections = Array.isArray(body?.sections) ? body.sections : [];
    const sitemaps = Array.isArray(body?.sitemaps) ? body.sitemaps : [];
    const matched = body?.matched as RobotsSection | undefined;

    let out = `--- robots.txt (${body?.url || 'n/a'}) ---\n`;
    if (typeof body?.status === 'number') out += `HTTP:\t${body.status}${body.contentType ? `  (${body.contentType})` : ''}\n`;
    if (ua) out += `User-Agent query:\t${ua}\n`;
    out += `Sections:\t${sections.length}\n`;

    for (const s of sections) {
      out += `\n[UA: ${s.userAgent}]\n`;
      out += `  Allow (${s.allow?.length || 0}): ${s.allow?.length ? '...' : '(none)'}\n`;
      out += `  Disallow (${s.disallow?.length || 0}): ${s.disallow?.length ? '...' : '(none)'}\n`;
      if (s.crawlDelay != null) out += `  Crawl-delay: ${s.crawlDelay}\n`;
    }

    if (sitemaps.length) {
      out += `\nSitemaps (${sitemaps.length}):\n`;
      sitemaps.slice(0, 10).forEach(u => (out += `  - ${u}\n`));
      if (sitemaps.length > 10) out += `  ...and ${sitemaps.length - 10} more\n`;
    }

    if (matched) {
      out += `\n--- Matched rules (${matched.userAgent}) ---\n`;
      out += `Allow (${matched.allow?.length || 0})\n`;
      out += `Disallow (${matched.disallow?.length || 0})\n`;
      if (matched.crawlDelay != null) out += `Crawl-delay: ${matched.crawlDelay}\n`;
    }

    return out + '\n';
  }
}