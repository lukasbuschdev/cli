import { inject, Injectable, NgZone } from '@angular/core';
import { typeCommand } from '../../types/types';
import { UtilsService } from '../utils.service';
import { HttpRequestsService } from '../http-requests.service';

@Injectable({
  providedIn: 'root'
})
export class PingService {
  utils = inject(UtilsService);
  httpRequests = inject(HttpRequestsService);
  ngZone = inject(NgZone);

  currentPingInterval: any = null;

  // PING

  ping(command: string, executedCommands: typeCommand[], currentPathString: string, scrollDown: () => void): void {
    const tokens = command.trim().split(' ');
    const url = tokens[1];

    if(!this.checkPingValidation(command, tokens, executedCommands, currentPathString, scrollDown)) return;
    this.httpRequests.isFetching = true;
    this.httpRequests.isPinging = true;
    
    executedCommands.push({ command, output: `ping ${url}`, path: currentPathString });
    const pingIndex = executedCommands.length - 1;

    this.currentPingInterval = setInterval(() => {
      const startTime = performance.now();

      this.ngZone.run(() => {
        this.httpRequestPing(executedCommands, scrollDown, url, startTime, pingIndex);
      });
    }, 1000);
  }

  checkPingValidation(command: string, tokens: string[], executedCommands: typeCommand[], currentPathString: string, scrollDown: () => void): boolean {
    if(tokens.length < 2) {
      executedCommands.push({ command, output: 'ping: usage error: Destination address required', path: currentPathString });
      scrollDown();
      return false;
    }
    
    if(!tokens[1].includes('.')) {
      executedCommands.push({ command, output: `ping: ${tokens[1]}: Name or service not known`, path: currentPathString });
      scrollDown();
      return false;
    }

    this.checkCurrentPingIntervall();
    return true;
  }

  checkCurrentPingIntervall(): void {
    if(this.currentPingInterval) {
      clearInterval(this.currentPingInterval);
      this.currentPingInterval = null;
    }
  }

  httpRequestPing(executedCommands: typeCommand[], scrollDown: () => void, url: string, startTime: number, pingIndex: number): void {
    this.httpRequests.http.head(url, { observe: 'response' }).subscribe(
      response => {
        const latency = performance.now() - startTime;
        executedCommands[pingIndex].output += `\nPING ${url} status: ${response.status} time: ${latency.toFixed(2)}ms`;
        scrollDown();
      },
      error => {
        const rtt = performance.now() - startTime;
        executedCommands[pingIndex].output += `\nPing to ${url} failed (error: ${error.message}). RTT: ${rtt.toFixed(2)} ms`;
        scrollDown();
      }
    );
  }
}
