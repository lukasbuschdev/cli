import { inject, Injectable } from '@angular/core';
import { UtilsService } from '../utils.service';
import { HttpRequestsService } from '../http-requests.service';
import { typeCommand } from '../../types/types';

@Injectable({
  providedIn: 'root'
})
export class ReverseipService {
  utils = inject(UtilsService);
  httpService = inject(HttpRequestsService);

  reverseip(command: string, executedCommands: typeCommand[], currentPathString: string, scrollDown: () => void): void {
    const tokens = command.trim().split(/\s+/);
    const q = tokens.slice(1).find(t => !t.startsWith('--'));
    if (!q) {
      executedCommands.push({ command, output: 'reverseip: usage error: IP or domain required', path: currentPathString });
      scrollDown();
      return;
    }

    const wantJson = tokens.includes('--json');
    const wantAll  = tokens.includes('--all');

    executedCommands.push({ command, output: `Reverse DNS for ${q}...\n\n`, path: currentPathString });
    const traceIndex = executedCommands.length - 1;
    this.httpService.isFetching = true;

    const url = `https://proxy.lukasbusch.dev/reverseip?query=${encodeURIComponent(q)}${wantJson ? '&raw=1' : ''}${wantAll ? '&all=1' : ''}`;

    this.httpService.http.get<any>(url).subscribe({
      next: (body) => {
        const out = wantJson ? (JSON.stringify(body, null, 2) + '\n') : this.formatReverseIp(q, body);
        executedCommands[traceIndex].output += out;
        this.httpService.isFetching = false;
        scrollDown();
      },
      error: (err) => {
        executedCommands[traceIndex].output += `Error (reverseip): ${err?.error?.error || err?.message || 'Unknown error'}\n`;
        this.httpService.isFetching = false;
        scrollDown();
      }
    });
  }

  private formatReverseIp(input: string, body: any): string {
    const lines: string[] = [];
    if (body?.type === 'ip') {
      lines.push(`IP:\t\t${body.query}`);
      if (body.ptrName) lines.push(`PTR name:\t${body.ptrName}`);
      if (Array.isArray(body.ptr) && body.ptr.length) {
        lines.push(`Hostnames:\n  - ${body.ptr.join('\n  - ')}`);
      } else {
        lines.push('Hostnames:\t(none)');
      }
      return lines.join('\n') + '\n';
    }

    if (body?.type === 'domain' && Array.isArray(body.addresses)) {
      lines.push(`Domain:\t${body.query}`);
      if (!body.addresses.length) {
        lines.push('No A/AAAA records found.');
        return lines.join('\n') + '\n';
      }
      for (const a of body.addresses) {
        lines.push(`\nIP:\t\t${a.ip} (IPv${a.family || '?'})`);
        if (a.ptrName) lines.push(`PTR name:\t${a.ptrName}`);
        if (Array.isArray(a.ptr) && a.ptr.length) {
          lines.push(`Hostnames:\n  - ${a.ptr.join('\n  - ')}`);
        } else {
          lines.push('Hostnames:\t(none)');
        }
      }
      return lines.join('\n') + '\n';
    }

    return JSON.stringify(body, null, 2) + '\n';
  }
}
