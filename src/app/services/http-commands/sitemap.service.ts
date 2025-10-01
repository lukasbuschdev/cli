import { inject, Injectable } from '@angular/core';
import { UtilsService } from '../utils.service';
import { HttpRequestsService } from '../http-requests.service';
import { SitemapPayload, typeCommand } from '../../types/types';

@Injectable({ providedIn: 'root' })
export class SitemapService {
  utils = inject(UtilsService);
  httpRequests = inject(HttpRequestsService);

  private readonly PROXY = 'https://proxy.lukasbusch.dev/sitemap';

  sitemap(command: string, executedCommands: typeCommand[], currentPathString: string, scrollDown: () => void): void {
    const tokens = command.trim().split(/\s+/);
    const arg = tokens.slice(1).find(t => !t.startsWith('--')) || '';
    const topN = this.extractTop(tokens);
    const rawFlag = tokens.includes('--json'); // parity with your whois: --json -> raw XML passthrough

    if (!arg) {
      executedCommands.push({ command, output: 'sitemap: usage error: URL or domain required', path: currentPathString });
      scrollDown();
      return;
    }

    executedCommands.push({ command, output: `Fetching sitemap for ${arg}...\n\n`, path: currentPathString });
    const traceIndex = executedCommands.length - 1;
    this.httpRequests.isFetching = true;

    const url = this.buildProxyUrl(arg, topN, rawFlag);

    if (rawFlag) {
      this.httpRequestRawText(url, executedCommands, traceIndex, scrollDown); // for raw text passthrough
    } else {
      this.httpRequestJsonSummary(url, executedCommands, traceIndex, topN, scrollDown); // for JSON summary
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
          executedCommands[traceIndex].output += `Error (sitemap): ${err?.error?.error || err?.message || 'Unknown error'}\n`;
          this.httpRequests.isFetching = false;
          scrollDown();
        }
      });
  }

  private httpRequestJsonSummary(url: string, executedCommands: typeCommand[], traceIndex: number, topN: number, scrollDown: () => void): void {
    this.httpRequests.http
      .get<SitemapPayload>(url)
      .subscribe({
        next: (body) => {
          executedCommands[traceIndex].output += this.formatSummary(body, topN);
          this.httpRequests.isFetching = false;
          scrollDown();
        },
        error: (err) => {
          executedCommands[traceIndex].output += `Error (sitemap): ${err?.error?.error || err?.message || 'Unknown error'}\n`;
          this.httpRequests.isFetching = false;
          scrollDown();
        }
      });
  }

  private extractTop(tokens: string[]): number {
    const m = tokens.join(' ').match(/--top\s+(\d+)/i);
    const n = m ? parseInt(m[1], 10) : 5;
    return Math.max(1, Math.min(100, isFinite(n) ? n : 5));
  }

  private buildProxyUrl(target: string, top: number, raw: boolean): string {
    // accept bare host or full URL; proxy normalizes and defaults /sitemap.xml
    const p = new URL(this.PROXY);
    p.searchParams.set('url', target);
    p.searchParams.set('top', String(top));
    if (raw) p.searchParams.set('raw', '1');
    return p.toString();
  }

  private formatSummary(body: SitemapPayload, topN: number): string {
    let out = `--- Sitemap (${body?.url || 'n/a'}) ---\n`;
    if (typeof (body as any)?.status === 'number') {
      out += `HTTP:\t${(body as any).status}${(body as any).contentType ? `  (${(body as any).contentType})` : ''}\n`;
    }
    out += `Kind:\t${(body as any).kind || 'unknown'}\n`;

    if ((body as any).kind === 'urlset') {
      const d = body as Extract<SitemapPayload, { kind: 'urlset' }>;
      out += `URLs:\t${d.totalUrls}\n`;
      if (d.lastmodMin || d.lastmodMax) out += `Lastmod range:\t${d.lastmodMin ?? 'n/a'} → ${d.lastmodMax ?? 'n/a'}\n`;
      const show = Array.isArray(d.top) ? d.top.slice(0, topN) : [];
      out += `\nTop ${show.length} by lastmod:\n`;
      for (const u of show) out += `  - ${u.loc}${u.lastmod ? `  (${u.lastmod})` : ''}\n`;
      return out + '\n';
    }

    if ((body as any).kind === 'sitemapindex') {
      const d = body as Extract<SitemapPayload, { kind: 'sitemapindex' }>;
      out += `Children:\t${d.children}\n`;
      if (d.lastmodMin || d.lastmodMax) out += `Lastmod range:\t${d.lastmodMin ?? 'n/a'} → ${d.lastmodMax ?? 'n/a'}\n`;
      const show = Array.isArray(d.top) ? d.top.slice(0, topN) : [];
      out += `\nTop ${show.length} children by lastmod:\n`;
      for (const s of show) out += `  - ${s.loc}${s.lastmod ? `  (${s.lastmod})` : ''}\n`;
      return out + '\n';
    }

    return out + 'Unable to parse sitemap XML (unexpected root element or parser error).\n';
  }
}
