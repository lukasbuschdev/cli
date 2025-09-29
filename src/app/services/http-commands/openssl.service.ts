import { inject, Injectable } from '@angular/core';
import { UtilsService } from '../utils.service';
import { HttpRequestsService } from '../http-requests.service';
import { typeCommand } from '../../types/types';

@Injectable({
  providedIn: 'root'
})
export class OpensslService {
  utils = inject(UtilsService);
  httpRequests = inject(HttpRequestsService);

  openssl(command: string, executedCommands: typeCommand[], currentPathString: string, scrollDown: () => void): void {
    const tokens = command.trim().split(/\s+/);
    if (!this.checkSslInput(command, executedCommands, currentPathString, scrollDown, tokens)) return;

    const { domain, json } = this.parseSslArgs(tokens);

    executedCommands.push({ command, output: `Checking SSL certificate for ${domain}...\n\n`, path: currentPathString });
    const traceIndex = executedCommands.length - 1;
    this.httpRequests.isFetching = true;

    const url = this.buildSslUrl(domain, json);

    this.httpRequests.http.get<any>(url).subscribe({
      next: (body) => {
        const out = json ? (JSON.stringify(body, null, 2) + '\n') : this.formatSsl(body);
        executedCommands[traceIndex].output += out;
        this.httpRequests.isFetching = false;
        scrollDown();
      },
      error: (err) => {
        executedCommands[traceIndex].output += `Error (openssl): ${err?.error?.error || err?.message || 'Unknown error'}\n`;
        this.httpRequests.isFetching = false;
        scrollDown();
      }
    });
  }

  private checkSslInput(command: string, executedCommands: typeCommand[], currentPathString: string,scrollDown: () => void,tokens: string[]): boolean {
    if (tokens.length < 2) {
      executedCommands.push({ command, output: 'openssl: usage error: Domain required', path: currentPathString });
      scrollDown();
      return false;
    }
    const d = tokens.slice(1).find(t => !t.startsWith('--'));
    if (!d) {
      executedCommands.push({ command, output: 'openssl: usage error: Domain required', path: currentPathString });
      scrollDown();
      return false;
    }
    return true;
  }

  private parseSslArgs(tokens: string[]): { domain: string; json: boolean } {
    const json = tokens.includes('--json');
    const domain = tokens.slice(1).find(t => !t.startsWith('--')) || '';
    return { domain, json };
  }

  private buildSslUrl(domain: string, json: boolean): string {
    const base = `https://proxy.lukasbusch.dev/ssl?domain=${encodeURIComponent(domain)}`;
    return json ? `${base}&raw=1` : base;
  }

  private formatSsl(body: any): string {
    const lines: string[] = [];
    const subj = body.subject ? this.kvToLine(body.subject) : '';
    const issuer = body.issuer ? this.kvToLine(body.issuer) : '';

    if (subj)   lines.push(`Subject: ${subj}`);
    if (issuer) lines.push(`Issuer: ${issuer}`);
    if (body.valid_from) lines.push(`Valid from: ${body.valid_from}`);
    if (body.valid_to)   lines.push(`Valid to: ${body.valid_to}`);
    if (typeof body.valid_now === 'boolean') lines.push(`Currently valid: ${body.valid_now ? 'Yes' : 'No'}`);

    if (Array.isArray(body.alt_names) && body.alt_names.length) {
      lines.push(`Alt Names:\n  - ${body.alt_names.join('\n  - ')}`);
    }

    return lines.join('\n') + '\n';
  }

  /** Render { C: 'US', O: 'X', CN: 'Y' } → C=US, O=X, CN=Y */
  private kvToLine(obj: Record<string, any>): string {
    try {
      const pairs = Object.entries(obj).map(([k,v]) => `${k}=${v}`);
      return pairs.join(', ');
    } catch {
      return JSON.stringify(obj);
    }
  }
}
