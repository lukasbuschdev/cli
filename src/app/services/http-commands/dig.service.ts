import { inject, Injectable } from '@angular/core';
import { UtilsService } from '../utils.service';
import { typeCommand } from '../../types/types';
import { HttpRequestsService } from '../http-requests.service';

@Injectable({
  providedIn: 'root'
})
export class DigService {
  utils = inject(UtilsService);
  httpRequests = inject(HttpRequestsService);

  dig(command: string, executedCommands: typeCommand[], currentPathString: string, scrollDown: () => void): void {
    const tokens = command.trim().split(' ');
    if(!this.checkDigInput(command, tokens, executedCommands, currentPathString, scrollDown)) return;

    executedCommands.push({ command, output: '', path: currentPathString });
    const digIndex = executedCommands.length - 1;

    const hostname = tokens[1];
    const url = `https://dns.google/resolve?name=${hostname}&type=A`;
    const startTime = performance.now();

    this.httpRequestDig(executedCommands, scrollDown, digIndex, hostname, url, startTime);
  }

  checkDigInput(command: string, tokens: string[], executedCommands: typeCommand[], currentPathString: string, scrollDown: () => void): boolean {
    if(tokens.length < 2) {
      executedCommands.push({ command, output: 'dig: usage error: Destination address required', path: currentPathString });
      scrollDown();
      return false;
    }

    return true;
  }

  getDigResponseData(response: any, hostname: string, startTime: number): string {
    const domain = response.Question && response.Question.length > 0 ? response.Question[0].name : hostname + '.';
    const answer = response.Answer && response.Answer.length > 0 ? response.Answer[0] : null;
    const statusText = response.Status === 0 ? 'NOERROR' : response.Status;
    const id = this.utils.generateRandomId();
    const queryTime = Math.round(performance.now() - startTime) + ' msec';
    const msgSize = answer ? 59 : 36;
    return `\n; <<>> DiG 9.18.30-0ubuntu0.22.04.2-Ubuntu <<>> ${domain.replace(/\.$/, '')}\n;; global options: +cmd\n;; Got answer:\n;; ->>HEADER<<- opcode: QUERY, status: ${statusText}, id: ${id}\n;; flags: qr rd ra; QUERY: 1, ANSWER: ${answer ? 1 : 0}, AUTHORITY: 0, ADDITIONAL: 1\n\n;; OPT PSEUDOSECTION:\n; EDNS: version: 0, flags:; udp: 65494\n;; QUESTION SECTION:\n;${domain}\t\tIN\tA\n\n;; ANSWER SECTION:\n${answer ? `${answer.name}\t\t${answer.TTL}\tIN\tA\t${answer.data}` : ''}\n\n;; Query time: ${queryTime}\n;; SERVER: 127.0.0.53#53(127.0.0.53) (UDP)\n;; WHEN: ${this.utils.formatTimestamp(new Date())}\n;; MSG SIZE  rcvd: ${msgSize}\n`;
  }

  httpRequestDig(executedCommands: typeCommand[], scrollDown: () => void, digIndex: number, hostname: string, url: string, startTime: number): void {
    this.httpRequests.http.get(url).subscribe(
      (response: any) => {
        const data = this.getDigResponseData(response, hostname, startTime);
        executedCommands[digIndex].output += data;
        scrollDown();
      },
      error => {
        executedCommands[digIndex].output += `Error: ${error.message}`;
        scrollDown();
      }
    );
  }
}
