import { inject, Injectable } from '@angular/core';
import { UtilsService } from '../utils.service';
import { HttpRequestsService } from '../http-requests.service';
import { typeCommand } from '../../types/types';
import { LocalRequestsService } from '../local-requests.service';
import { ColorService } from '../local-commands/color.service';

@Injectable({
  providedIn: 'root'
})
export class CurlService {
  utils = inject(UtilsService);
  httpRequests = inject(HttpRequestsService);
  localRequests = inject(LocalRequestsService);
  colorService = inject(ColorService);

  curl(command: string, executedCommands: typeCommand[], currentPathString: string, scrollDown: () => void, hostElement: HTMLElement): void {
    const tokens = command.trim().split(/\s+/);
    const wantsHeaders = this.hasHeadersFlag(tokens);
    const target = this.firstNonFlagArg(tokens);

    if (!target) {
      executedCommands.push({ command, output: 'curl: usage error: Destination address required\nTip: try "curl -I <url>" to fetch only headers', path: currentPathString });
      scrollDown();
      return;
    }

    executedCommands.push({ command, output: '', path: currentPathString });
    const curlIndex = executedCommands.length - 1;
    this.httpRequests.isFetching = true;

    const rawUrl = (target.startsWith('http://') || target.startsWith('https://')) ? target : 'https://' + target;
    const proxyBase = 'https://proxy.lukasbusch.dev';
    const proxyUrl = `${proxyBase}/proxy?ngsw-bypass=true&url=`;
    const headersUrl = `${proxyBase}/headers?ngsw-bypass=true&url=`;

    let fetchUrl = '';

    if (target === 'matrix') {
      fetchUrl = 'https://lukasbusch.dev/matrix.txt?ngsw-bypass=true';
    } else if (target === '86.173.192.12:80') {
      fetchUrl = 'https://lukasbusch.dev/congrats.txt?ngsw-bypass=true';
    } else {
      fetchUrl = (wantsHeaders ? (headersUrl + encodeURIComponent(rawUrl)) : (proxyUrl + encodeURIComponent(rawUrl)));
    }

    if (wantsHeaders) {
      this.httpRequestCurlHeaders(executedCommands, scrollDown, rawUrl, fetchUrl, curlIndex);
    } else {
      this.httpRequestCurl(executedCommands, scrollDown, rawUrl, fetchUrl, curlIndex);
      if (target === 'matrix') this.colorService.color(command, executedCommands, currentPathString, hostElement, scrollDown);
    }
  }

  checkCurlInput(command: string, tokens: string[], executedCommands: typeCommand[], currentPathString: string, scrollDown: () => void): boolean {
    if(tokens.length < 2) {
      executedCommands.push({ command, output: 'curl: usage error: Destination address required', path: currentPathString });
      scrollDown();
      return false;
    }
    
    return true;
  }

  hasHeadersFlag(tokens: string[]): boolean {
    return tokens.includes('-I');
  }
  
  firstNonFlagArg(tokens: string[]): string | null {
    for (const t of tokens.slice(1)) {
      if (!t.startsWith('-')) return t;
    }
    return null;
  }

  httpRequestCurl(executedCommands: typeCommand[], scrollDown: () => void, rawUrl: string, fetchUrl: string, curlIndex: number): void {
    this.httpRequests.http.get(fetchUrl, { responseType: 'text' }).subscribe(
      response => {
        executedCommands[curlIndex].output += response;
        this.httpRequests.isFetching = false;
        scrollDown();
      },
      (error) => {
        executedCommands[curlIndex].output += this.formatCurlError(error, rawUrl);
        this.httpRequests.isFetching = false;
        scrollDown();
      }
    );
  }

  httpRequestCurlHeaders(executedCommands: typeCommand[], scrollDown: () => void, rawUrl: string, fetchUrl: string, curlIndex: number): void {
    this.httpRequests.http.get(fetchUrl, { responseType: 'text' }).subscribe(
      (text) => {
        executedCommands[curlIndex].output = text;
        this.httpRequests.isFetching = false;
        scrollDown();
      },
      (error) => {
        executedCommands[curlIndex].output += this.formatCurlError(error, rawUrl);
        this.httpRequests.isFetching = false;
        scrollDown();
      }
    );
  }

  formatCurlError(err: any, url: string): string {
    if (err.status === 429) {
      return `curl: upstream returned 429 (Too Many Requests) for ${url}\n\n` +
             `Tip: try "curl -I ${url}" to fetch only headers (lighter, less likely to be blocked).`;
    }
    return `Error: ${err.message || 'unknown error'} (status ${err.status || 'n/a'})`;
  }
}
