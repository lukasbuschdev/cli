import { inject, Injectable } from '@angular/core';
import { UtilsService } from '../utils.service';
import { HttpRequestsService } from '../http-requests.service';
import { typeCommand } from '../../types/types';

@Injectable({
  providedIn: 'root'
})
export class WhoisService {
  utils = inject(UtilsService);
  httpRequests = inject(HttpRequestsService);

  whois(command: string, executedCommands: typeCommand[], currentPathString: string, scrollDown: () => void): void {
    const tokens = command.trim().split(/\s+/);

    // Reuse your existing validation (keeps behavior identical)
    if (!this.checkWhoisInput(command, executedCommands, currentPathString, scrollDown, tokens)) return;

    const { arg, rawFlag } = this.parseWhoisArgs(tokens);
    executedCommands.push({ command, output: `Looking up WHOIS for ${arg}...\n\n`, path: currentPathString });
    const traceIndex = executedCommands.length - 1;
    this.httpRequests.isFetching = true;

    const url = this.buildWhoisUrl(arg, rawFlag);

    this.httpRequests.http.get<any>(url).subscribe({
      next: (body) => {
        const out = rawFlag ? JSON.stringify(body, null, 2) + '\n' : this.formatWhoisOutput(body, arg);
        executedCommands[traceIndex].output += out;
        this.httpRequests.isFetching = false;
        scrollDown();
      },
      error: (err) => {
        executedCommands[traceIndex].output += `Error (whois): ${err?.error?.error || err?.message || 'Unknown error'}\n`;
        this.httpRequests.isFetching = false;
        scrollDown();
      }
    });
  }

  /** Extract first non-flag argument and flags (like --json) */
  private parseWhoisArgs(tokens: string[]): { arg: string; rawFlag: boolean } {
    const rawFlag = tokens.includes('--json');
    // first non-flag after "whois"
    const arg = tokens.slice(1).find(t => !t.startsWith('--')) || '';
    return { arg, rawFlag };
  }

  /** Build proxy URL with optional raw passthrough */
  private buildWhoisUrl(arg: string, rawFlag: boolean): string {
    const base = `https://proxy.lukasbusch.dev/whois?domain=${encodeURIComponent(arg)}`;
    return rawFlag ? `${base}&raw=1` : base;
  }

  /** Decide IP vs domain and format accordingly */
  private formatWhoisOutput(body: any, arg: string): string {
    const cls = String(body?.objectClassName || '').toLowerCase();
    if (cls.includes('ip') || body?.startAddress || body?.endAddress) return this.formatIpBody(body, arg);
    return this.formatDomainBody(body, arg);
  }

  /** Pretty print domain RDAP */
  private formatDomainBody(body: any, arg: string): string {
    const lines: string[] = [];
    lines.push(`Domain:\t\t${body.unicodeName || body.ldhName || arg}`);
    if (body.ldhName && body.unicodeName && body.ldhName !== body.unicodeName) {
      lines.push(`ASCII:\t\t${body.ldhName}`);
    }
    if (body.registrar) lines.push(`Registrar:\t${body.registrar}`);

    if (Array.isArray(body.status) && body.status.length) {
      lines.push(`Status:\t\t${body.status.join(', ')}`);
    }

    lines.push(`Created:\t${this.formatDate(body.registration)}`);
    lines.push(`Expires:\t${this.formatDate(body.expiration)}`);
    if (body.lastChanged) lines.push(`Updated:\t${this.formatDate(body.lastChanged)}`);

    if (Array.isArray(body.abuseEmails) && body.abuseEmails.length) {
      lines.push(`Abuse:\t\t${body.abuseEmails.join(', ')}`);
    }

    if (Array.isArray(body.nameServers) && body.nameServers.length) {
      lines.push(`Name servers:\n  - ${body.nameServers.join('\n  - ')}`);
    }

    return lines.join('\n') + '\n';
  }

  /** Pretty print IP network RDAP */
  private formatIpBody(body: any, arg: string): string {
    const lines: string[] = [];
    lines.push(`IP / Network:\t${arg}`);
    if (body.handle)       lines.push(`Handle:\t\t${body.handle}`);
    if (body.name)         lines.push(`Name:\t\t${body.name}`);
    if (body.startAddress) lines.push(`Start:\t\t${body.startAddress}`);
    if (body.endAddress)   lines.push(`End:\t\t${body.endAddress}`);
    if (body.country)      lines.push(`Country:\t${body.country}`);

    if (Array.isArray(body.events) && body.events.length) {
      const ev = body.events.slice(0, 4)
        .map((e: any) => `  - ${e.eventAction}: ${this.formatDate(e.eventDate)}`)
        .join('\n');
      lines.push(`Events:\n${ev}`);
    }

    return lines.join('\n') + '\n';
  }

  /** Consistent date formatting (UTC) */
  private formatDate(date?: string | null): string {
    return date ? new Date(date).toISOString().replace('T', ' ').replace('Z', ' UTC') : '—';
  }

  checkWhoisInput(command: string, executedCommands: typeCommand[], currentPathString: string,scrollDown: () => void,tokens: string[]): boolean {
    if (tokens.length < 2) {
      executedCommands.push({ command, output: 'whois: usage error: Domain or IP required', path: currentPathString });
      scrollDown();
      return false;
    }
    // first non-flag arg
    const arg = tokens.slice(1).find(t => !t.startsWith('--'));
    if (!arg) {
      executedCommands.push({ command, output: 'whois: usage error: Domain or IP required', path: currentPathString });
      scrollDown();
      return false;
    }
    // allow domains (have a dot) or IPv4/IPv6
    const looksLikeDomain = /[.]/.test(arg);
    const looksLikeIPv4 = /^[0-9.]+$/.test(arg);
    const looksLikeIPv6 = /^[0-9a-f:.]+$/i.test(arg);
    if (!looksLikeDomain && !looksLikeIPv4 && !looksLikeIPv6) {
      executedCommands.push({ command, output: `whois: "${arg}" is not a valid domain or IP`, path: currentPathString });
      scrollDown();
      return false;
    }
    return true;
  }
}
