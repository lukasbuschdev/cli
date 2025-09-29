import { inject, Injectable } from '@angular/core';
import { UtilsService } from '../utils.service';
import { HttpRequestsService } from '../http-requests.service';
import { typeCommand } from '../../types/types';

@Injectable({
  providedIn: 'root'
})
export class GeoipService {
  utils = inject(UtilsService);
  httpRequests = inject(HttpRequestsService);

  geoip(command: string, executedCommands: typeCommand[], currentPathString: string,scrollDown: () => void): void {
    const tokens = command.trim().split(/\s+/);
    if (!this.checkGeoipInput(command, executedCommands, currentPathString, scrollDown, tokens)) return;

    const { query, json } = this.parseGeoipArgs(tokens);

    executedCommands.push({ command, output: `GeoIP lookup for ${query}...\n\n`, path: currentPathString });
    const traceIndex = executedCommands.length - 1;
    this.httpRequests.isFetching = true;

    const url = this.buildGeoipUrl(query, json);

    this.httpRequests.http.get<any>(url).subscribe({
      next: (body) => {
        const out = json ? (JSON.stringify(body, null, 2) + '\n')
                         : this.formatGeoip(body);
        executedCommands[traceIndex].output += out;
        this.httpRequests.isFetching = false;
        scrollDown();
      },
      error: (err) => {
        executedCommands[traceIndex].output += `Error (geoip): ${err?.error?.error || err?.message || 'Unknown error'}\n`;
        this.httpRequests.isFetching = false;
        scrollDown();
      }
    });
  }

  private checkGeoipInput(command: string, executedCommands: typeCommand[], currentPathString: string,scrollDown: () => void,tokens: string[]): boolean {
    if (tokens.length < 2) {
      executedCommands.push({ command, output: 'geoip: usage error: IP or domain required', path: currentPathString });
      scrollDown();
      return false;
    }
    const q = tokens.slice(1).find(t => !t.startsWith('--'));
    if (!q) {
      executedCommands.push({ command, output: 'geoip: usage error: IP or domain required', path: currentPathString });
      scrollDown();
      return false;
    }
    return true;
  }

  private parseGeoipArgs(tokens: string[]): { query: string; json: boolean } {
    const json = tokens.includes('--json');
    const query = tokens.slice(1).find(t => !t.startsWith('--')) || '';
    return { query, json };
  }

  private buildGeoipUrl(query: string, json: boolean): string {
    const base = `https://proxy.lukasbusch.dev/geoip?query=${encodeURIComponent(query)}`;
    return json ? `${base}&raw=1` : base;
  }

  private formatGeoip(body: any): string {
    // if backend returned compact payload
    if (body?.location && body?.network) {
      const b = body;
      const L = b.location;
      const N = b.network;

      const lines: string[] = [];
      lines.push(`Query:\t\t${b.query}`);
      lines.push(`Country:\t${L.country} (${L.countryCode})`);
      if (L.regionName) lines.push(`Region:\t\t${L.regionName}${L.region ? ' (' + L.region + ')' : ''}`);
      if (L.city) lines.push(`City:\t\t${L.city}${L.zip ? ' ' + L.zip : ''}`);
      lines.push(`Coords:\t\t${this.utils.formatCoordinates(L.lat, L.lon)}`);
      if (L.timezone) lines.push(`Timezone:\t${L.timezone}${typeof L.offset === 'number' ? ` (UTC${this.formatOffset(L.offset)})` : ''}`);

      if (N.isp) lines.push(`ISP:\t\t${N.isp}`);
      if (N.org) lines.push(`Org:\t\t${N.org}`);
      if (N.as || N.asname) lines.push(`ASN:\t\t${N.as || ''}${N.as && N.asname ? ' ('+N.asname+')' : (N.asname || '')}`);
      if (N.reverse) lines.push(`Reverse:\t${N.reverse}`);
      lines.push(`Mobile:\t\t${N.mobile ? 'Yes' : 'No'}`);
      lines.push(`Proxy:\t\t${N.proxy ? 'Yes' : 'No'}`);
      lines.push(`Hosting:\t${N.hosting ? 'Yes' : 'No'}`);

      return lines.join('\n') + '\n';
    }

    // if backend returned raw ip-api payload (when --json omitted accidentally on raw)
    return JSON.stringify(body, null, 2) + '\n';
  }

  private formatOffset(seconds: number): string {
    // seconds east of UTC; ip-api uses seconds offset
    const sign = seconds >= 0 ? '+' : '-';
    const abs = Math.abs(seconds);
    const hh = String(Math.floor(abs / 3600)).padStart(2, '0');
    const mm = String(Math.floor((abs % 3600) / 60)).padStart(2, '0');
    return `${sign}${hh}:${mm}`;
  }
}
