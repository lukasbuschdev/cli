import { inject, Injectable } from '@angular/core';
import { UtilsService } from '../utils.service';
import { HttpRequestsService } from '../http-requests.service';
import { typeCommand } from '../../types/types';

@Injectable({
  providedIn: 'root'
})
export class TracerouteService {
  utils = inject(UtilsService);
  httpRequests = inject(HttpRequestsService);
  
  traceroute(command: string, executedCommands: typeCommand[], currentPathString: string, scrollDown: () => void): void {
    const tokens = command.trim().split(' ');

    if(!this.checkTracerouteInput(command, executedCommands, currentPathString, scrollDown, tokens)) return;
    executedCommands.push({ command, output: `Traceroute to ${tokens[1]} in progress...\n`, path: currentPathString });

    const traceIndex = executedCommands.length - 1;
    this.httpRequests.isFetching = true;

    const fetchUrl = `https://api.lukasbusch.dev/traceroute?q=${encodeURIComponent(tokens[1])}`;

    this.httpRequestTraceroute(executedCommands, scrollDown, fetchUrl, traceIndex);
  }

  checkTracerouteInput(command: string, executedCommands: typeCommand[], currentPathString: string, scrollDown: () => void, tokens: string[]): boolean {
    if(tokens.length < 2) {
      executedCommands.push({ command, output: 'traceroute: usage error: Destination address required', path: currentPathString });
      scrollDown();
      return false;
    }
    return true;
  }

  httpRequestTraceroute(executedCommands: typeCommand[], scrollDown: () => void, fetchUrl: string, traceIndex: number): void {
    this.httpRequests.http.get(fetchUrl, { responseType: 'text' }).subscribe(
      (response: string) => {
        executedCommands[traceIndex].output = response;
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
