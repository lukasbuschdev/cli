import { inject, Injectable } from '@angular/core';
import { UtilsService } from '../utils.service';
import { HttpRequestsService } from '../http-requests.service';
import { typeCommand } from '../../types/types';
import { HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StatusService {
  utils = inject(UtilsService);
  httpRequests = inject(HttpRequestsService);

  status(command: string, executedCommands: typeCommand[], currentPathString: string, scrollDown: () => void): void {
    const tokens = command.trim().split(/\s+/);
    if (!this.checkStatusInput(command, executedCommands, currentPathString, scrollDown, tokens)) return;
    
    let raw = tokens[1];
    if (!/^https?:\/\//i.test(raw)) raw = `https://${raw}`;
    const target = new URL(raw);
    target.searchParams.set('ngsw-bypass', 'true');

    executedCommands.push({ command, output: `Checking status for ${raw}...\n\n`, path: currentPathString });
    const traceIndex = executedCommands.length - 1;
    this.httpRequests.isFetching = true;

    this.httpRequestStatus(executedCommands, scrollDown, raw, target.toString(), traceIndex);
  }

  checkStatusInput(command: string, executedCommands: typeCommand[], currentPathString: string, scrollDown: () => void, tokens: string[]): boolean {
    if(tokens.length < 2) {
      executedCommands.push({ command, output: 'status: usage error: Destination address required', path: currentPathString });
      scrollDown();
      return false;
    }

    return true;
  }

  httpRequestStatus(executedCommands: typeCommand[], scrollDown: () => void, rawUrl: string, fetchUrl: string, traceIndex: number): void {
    const start = performance.now();
    const proxied = `https://proxy.lukasbusch.dev/status?url=${encodeURIComponent(fetchUrl)}`;

    this.httpRequests.http.get<any>(proxied, { observe: 'response' }).subscribe({
      next: (res: HttpResponse<any>) => {
        const end = performance.now();
        const body = res.body || {};
        const lines: string[] = [];

        lines.push(`URL: ${rawUrl}`);
        lines.push(`Status: ${body.status} ${body.statusText || ''}`.trim());
        lines.push(`Time: ${(end - start).toFixed(1)} ms`);

        if (body.redirected) lines.push(`Redirected: ${body.redirected}`);
        if (body.headers?.location) lines.push(`Location: ${body.headers.location}`);
        if (body.headers?.['content-type']) lines.push(`Content-Type: ${body.headers['content-type']}`);
        if (body.headers?.['content-length']) lines.push(`Content-Length: ${body.headers['content-length']}`);

        executedCommands[traceIndex].output = (executedCommands[traceIndex].output || '') + lines.join('\n') + '\n';
        this.httpRequests.isFetching = false;
        scrollDown();
      },
      error: (err) => {
        executedCommands[traceIndex].output =
          (executedCommands[traceIndex].output || '') +
          `Error (proxy): ${err?.error?.error || err?.message || 'Unknown error'}\n`;
        this.httpRequests.isFetching = false;
        scrollDown();
      }
    });
  }
}
