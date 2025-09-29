import { inject, Injectable } from '@angular/core';
import { UtilsService } from '../utils.service';
import { HttpRequestsService } from '../http-requests.service';
import { typeCommand } from '../../types/types';

@Injectable({
  providedIn: 'root'
})
export class AsnService {
  utils = inject(UtilsService);
  httpRequests = inject(HttpRequestsService);

  asn(command: string, executedCommands: typeCommand[], currentPathString: string, scrollDown: () => void): void {
    const tokens = command.trim().split(/\s+/);
    // require one non-flag arg
    const q = tokens.slice(1).find(t => !t.startsWith('--'));
    if (!q) {
      executedCommands.push({ command, output: 'asn: usage error: IP or domain required', path: currentPathString });
      scrollDown();
      return;
    }

    const rawJson = tokens.includes('--json'); // optional, just dump geoip payload

    executedCommands.push({ command, output: `ASN lookup for ${q}...\n\n`, path: currentPathString });
    const traceIndex = executedCommands.length - 1;
    this.httpRequests.isFetching = true;

    const url = `https://proxy.lukasbusch.dev/geoip?query=${encodeURIComponent(q)}${rawJson ? '&raw=1' : ''}`;

    this.httpRequests.http.get<any>(url).subscribe({
      next: (body) => {
        if (rawJson) {
          executedCommands[traceIndex].output += JSON.stringify(body, null, 2) + '\n';
        } else {
          const isCompact = body?.location && body?.network;
          const asStr   = isCompact ? (body.network.as || '') : (body.as || '');
          const asName  = isCompact ? (body.network.asname || '') : (body.asname || '');
          const isp     = isCompact ? (body.network.isp || '') : (body.isp || '');
          const org     = isCompact ? (body.network.org || '') : (body.org || '');
          const query   = isCompact ? (body.query || q) : (body.query || q);
          const country = isCompact ? (body.location?.country || '') : (body.country || '');

          const lines: string[] = [];
          lines.push(`Query:\t\t${query}`);
          if (asStr) lines.push(`AS:\t\t${asStr}`);      // e.g. "AS15169 Google LLC"
          if (asName) lines.push(`AS Name:\t${asName}`); // e.g. "GOOGLE"
          if (isp) lines.push(`ISP:\t\t${isp}`);
          if (org) lines.push(`Org:\t\t${org}`);
          if (country) lines.push(`Country:\t${country}`);

          if (!asStr && !asName && !isp && !org)
            lines.push('(no ASN/ISP data available)');

          executedCommands[traceIndex].output += lines.join('\n') + '\n';
        }

        this.httpRequests.isFetching = false;
        scrollDown();
      },
      error: (err) => {
        executedCommands[traceIndex].output += `Error (asn): ${err?.error?.error || err?.message || 'Unknown error'}\n`;
        this.httpRequests.isFetching = false;
        scrollDown();
      }
    });
  }
}
