import { inject, Injectable } from '@angular/core';
import { UtilsService } from '../utils.service';
import { HttpRequestsService } from '../http-requests.service';
import { typeCommand } from '../../types/types';

@Injectable({
  providedIn: 'root'
})
export class TlschainService {
  utils = inject(UtilsService);
  httpReuqests = inject(HttpRequestsService);
  
  tlschain(command: string, executedCommands: typeCommand[], currentPathString: string, scrollDown: () => void): void {
    const { arg, rawFlag } = this.parseTlschainArgs(command);
    if (!arg) {
      executedCommands.push({ command, output: 'tlschain: usage error: DOMAIN required', path: currentPathString });
      scrollDown();
      return;
    }

    executedCommands.push({ command, output: `Fetching TLS chain for ${arg}...\n\n`, path: currentPathString });
    const idx = executedCommands.length - 1;
    this.httpReuqests.isFetching = true;

    const url = `https://proxy.lukasbusch.dev/tlschain?domain=${encodeURIComponent(arg)}${rawFlag ? '&raw=1' : ''}`;

    this.httpReuqests.http.get<any>(url).subscribe({
      next: (body) => {
        executedCommands[idx].output += rawFlag ? this.prettyJson(body) : this.formatTlschain(body);
        this.httpReuqests.isFetching = false;
        scrollDown();
      },
      error: (err) => {
        executedCommands[idx].output += `Error (tlschain): ${err?.error?.error || err?.message || 'Unknown error'}\n`;
        this.httpReuqests.isFetching = false;
        scrollDown();
      }
    });
  }

  private parseTlschainArgs(command: string): { arg: string | null, rawFlag: boolean } {
    const tokens = command.trim().split(/\s+/);
    const rawFlag = tokens.includes('--json');
    const arg = tokens.slice(1).find(t => !t.startsWith('--')) || null;
    return { arg, rawFlag };
  }

  private prettyJson(obj: any): string {
    try { return JSON.stringify(obj, null, 2) + '\n'; }
    catch { return String(obj) + '\n'; }
  }

  private formatTlschain(payload: any): string {
    // supports both { host, port, protocol, alpn, chain } or { summary: {...}, rawLeaf: {...} }
    const p = payload?.summary || payload || {};
    const lines: string[] = [];

    const host = p.host || '—';
    const port = p.port || 443;
    const proto = p.protocol || '—';
    const alpn  = p.alpn || '—';
    const depth = Array.isArray(p.chain) ? p.chain.length : 0;

    lines.push(`Host:\t\t${host}:${port}`);
    lines.push(`Protocol:\t${proto}`);
    lines.push(`ALPN:\t\t${alpn}`);
    lines.push(`Chain depth:\t${depth}`);

    const chain = Array.isArray(p.chain) ? p.chain : [];
    chain.forEach((c: any, i: number) => {
      const sub = c.subjectCN || c.subject?.CN || '—';
      const iss = c.issuerCN  || c.issuer?.CN  || '—';
      const from = c.valid_from ? this.isoish(c.valid_from) : '—';
      const to   = c.valid_to   ? this.isoish(c.valid_to)   : '—';

      lines.push('');
      lines.push(`[#${i}] Subject:\t${sub}`);
      lines.push(`    Issuer:\t${iss}`);
      if (Array.isArray(c.san) && c.san.length) {
        // keep it short if huge
        const preview = c.san.slice(0, 6).join(', ') + (c.san.length > 6 ? ` …(+${c.san.length - 6})` : '');
        lines.push(`    SAN:\t${preview}`);
      }
      lines.push(`    Valid:\t${from} → ${to}`);
      if (c.fingerprint256) lines.push(`    SHA256:\t${c.fingerprint256}`);
      if (c.pubkeyCurve)    lines.push(`    PubKey:\t${c.pubkeyCurve}`);
      lines.push(`    CA:\t\t${c.isCA ? 'yes' : 'no'}`);
    });

    lines.push('\nTip: use --json for full details.');
    return lines.join('\n') + '\n';
  }

  private isoish(s: string): string {
    // normalize OpenSSL-style dates such as "Sep  8 08:34:53 2025 GMT"
    const d = new Date(s);
    if (!isNaN(d.getTime())) {
      return d.toISOString().replace('T',' ').replace('Z',' UTC');
    }
    return s;
  }
}
