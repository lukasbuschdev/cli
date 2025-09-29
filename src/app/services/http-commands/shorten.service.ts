import { inject, Injectable } from '@angular/core';
import { UtilsService } from '../utils.service';
import { HttpRequestsService } from '../http-requests.service';
import { typeCommand } from '../../types/types';

@Injectable({
  providedIn: 'root'
})
export class ShortenService {
  utils = inject(UtilsService);
  httpRequests = inject(HttpRequestsService);

  shorten(command: string, executedCommands: typeCommand[], currentPathString: string, scrollDown: () => void): void {
    const tokens = command.trim().split(' ');

    if(!this.checkShortenInput(command, executedCommands, currentPathString, scrollDown, tokens)) return;
    executedCommands.push({ command, output: `Shorten ${tokens[1]} in progress...\n`, path: currentPathString });

    const traceIndex = executedCommands.length - 1;
    this.httpRequests.isFetching = true;

    const raw = tokens[1].startsWith('http://') || tokens[1].startsWith('https://') ? tokens[1] : `https://${tokens[1]}`;
    const fetchUrl = 'https://proxy.lukasbusch.dev/shorten?ngsw-bypass=true&url=' + encodeURIComponent(raw);

    this.httpRequestShorten(executedCommands, scrollDown, fetchUrl, traceIndex);
  }

  checkShortenInput(command: string, executedCommands: typeCommand[], currentPathString: string, scrollDown: () => void, tokens: string[]): boolean {
    if(tokens.length < 2) {
      executedCommands.push({ command, output: 'shorten: usage error: Destination address required', path: currentPathString });
      scrollDown();
      return false;
    }

    return true;
  }

  httpRequestShorten(executedCommands: typeCommand[], scrollDown: () => void, fetchUrl: string, traceIndex: number): void {
    this.httpRequests.http.get(fetchUrl, {responseType: 'text'}).subscribe(
      (text) => {
        try {
          const response = JSON.parse(text);
          const short = response?.shorturl || response?.result_url;
          executedCommands[traceIndex].output =  short ? `${short}` : `Unexpected JSON:\n${text}`;
        } catch {
          executedCommands[traceIndex].output =  `Upstream did not return JSON. \n\n${text}`;
        }
        this.httpRequests.isFetching = false;
        scrollDown();
      },
      error => {
        executedCommands[traceIndex].output += `Error: ${error.message}`;
        this.httpRequests.isFetching = false;
        scrollDown();
      }
    );
  }
}
