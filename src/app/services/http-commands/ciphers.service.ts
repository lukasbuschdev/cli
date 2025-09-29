import { inject, Injectable } from '@angular/core';
import { UtilsService } from '../utils.service';
import { HttpRequestsService } from '../http-requests.service';
import { typeCommand } from '../../types/types';

@Injectable({
  providedIn: 'root'
})
export class CiphersService {
  utils = inject(UtilsService);
  httpRequests = inject(HttpRequestsService);

  ciphers(command: string, executedCommands: typeCommand[], currentPathString: string,scrollDown: () => void): void {
    const tokens = command.trim().split(/\s+/);
    if (!this.checkCiphersInput(command, executedCommands, currentPathString, scrollDown, tokens)) return;

    const { domain, json, port } = this.parseCiphersArgs(tokens);

    executedCommands.push({ command, output: `TLS cipher/protocol for ${domain}${port !== 443 ? ':' + port : ''}...\n\n`, path: currentPathString });
    const traceIndex = executedCommands.length - 1;
    this.httpRequests.isFetching = true;

    const url = this.buildCiphersUrl(domain, port, json);

    this.httpRequests.http.get<any>(url).subscribe({
      next: (body) => {
        const out = json ? (JSON.stringify(body, null, 2) + '\n')
                         : this.formatCiphers(body);
        executedCommands[traceIndex].output += out;
        this.httpRequests.isFetching = false;
        scrollDown();
      },
      error: (err) => {
        executedCommands[traceIndex].output += `Error (ciphers): ${err?.error?.error || err?.message || 'Unknown error'}\n`;
        this.httpRequests.isFetching = false;
        scrollDown();
      }
    });
  }

  private checkCiphersInput(command: string,executedCommands: typeCommand[],currentPathString: string,scrollDown: () => void,tokens: string[]): boolean {
    if (tokens.length < 2) {
      executedCommands.push({ command, output: 'ciphers: usage error: Domain required', path: currentPathString });
      scrollDown();
      return false;
    }
    const d = tokens.slice(1).find(t => !t.startsWith('--') && !/^\d+$/.test(t));
    if (!d) {
      executedCommands.push({ command, output: 'ciphers: usage error: Domain required', path: currentPathString });
      scrollDown();
      return false;
    }
    return true;
  }

  private parseCiphersArgs(tokens: string[]): { domain: string; json: boolean; port: number } {
    const json = tokens.includes('--json');
    // Allow optional --port N
    const portFlagIdx = tokens.findIndex(t => t === '--port');
    let port = 443;
    if (portFlagIdx >= 0 && tokens[portFlagIdx + 1] && /^\d+$/.test(tokens[portFlagIdx + 1])) {
      port = parseInt(tokens[portFlagIdx + 1], 10);
    }
    // first non-flag token after command that isn't a number
    const domain = tokens.slice(1).find(t => !t.startsWith('--') && !/^\d+$/.test(t)) || '';
    return { domain, json, port };
  }

  private buildCiphersUrl(domain: string, port: number, json: boolean): string {
    const base = `https://proxy.lukasbusch.dev/ciphers?domain=${encodeURIComponent(domain)}&port=${port}`;
    return json ? `${base}&raw=1` : base;
  }

  private formatCiphers(body: any): string {
    const proto = body?.protocol || '—';
    const cipher = body?.cipher || '—';
    const std = body?.standardName ? ` (${body.standardName})` : '';
    const kxType = body?.ephemeralKey?.type || null;  // e.g., 'ECDH'
    const curve  = body?.ephemeralKey?.name || null;  // e.g., 'X25519'
    const bits   = body?.ephemeralKey?.size || null;  // e.g., 253
    const alpn   = body?.alpn || null;

    const parts: string[] = [];
    parts.push(`${proto}`);
    if (curve) {
      // Example: TLSv1.3 with X25519 and TLS_AES_128_GCM_SHA256
      parts.push(`with ${curve}`);
    } else if (kxType) {
      parts.push(`with ${kxType}`);
    }
    parts.push(`and ${cipher}${std}`);

    const line1 = parts.filter(Boolean).join(' ');
    const line2 = alpn ? `ALPN: ${alpn}` : '';

    const out = [line1, line2].filter(Boolean).join('\n');
    return out + '\n';
  }
}
