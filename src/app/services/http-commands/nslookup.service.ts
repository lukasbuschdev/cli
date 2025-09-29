import { inject, Injectable } from '@angular/core';
import { typeCommand, typeDnsResponse } from '../../types/types';
import { UtilsService } from '../utils.service';
import { HttpRequestsService } from '../http-requests.service';
import { forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NslookupService {
  utils = inject(UtilsService);
  httpRequests = inject(HttpRequestsService);


  nslookup(command: string, executedCommands: typeCommand[], currentPathString: string, scrollDown: () => void): void {
    const tokens = command.trim().split(' ');
    if(!this.checkNslookupInput(command, tokens, executedCommands, scrollDown)) return;

    executedCommands.push({ command, output: '', path: currentPathString });
    const lookupIndex = executedCommands.length - 1;

    const hostname = tokens[1];
    const urlA = `https://dns.google/resolve?name=${hostname}&type=A`;
    const urlAAAA = `https://dns.google/resolve?name=${hostname}&type=AAAA`;

    this.httpRequestNslookup(executedCommands, scrollDown, lookupIndex, hostname, urlA, urlAAAA);
  }

  checkNslookupInput(command: string, tokens: string[], executedCommands: typeCommand[], scrollDown: () => void): boolean {
    if(tokens.length < 2) {
      executedCommands.push({ command, output: `nslookup: usage error: Destination address required` });
      scrollDown();
      return false;
    }

    return true;
  }

  getFinalResponse(response: { a: any, aaaa: any }): any {
    const combinedAnswer: any[] = [];

    if(response.a && response.a.Answer) {
      combinedAnswer.push(...response.a.Answer);
    }
    if(response.aaaa && response.aaaa.Answer) {
      combinedAnswer.push(...response.aaaa.Answer);
    }

    return {
      Status: (response.a.Status === 0 || response.aaaa.Status === 0) ? 0 : response.a.Status,
      Answer: combinedAnswer
    }
  }

  getNslookupResponseData(response: typeDnsResponse, hostname: string): string {
    const serverInfo = `Server:\t\t127.0.0.53\nAddress:\t127.0.0.53#53\n\n`;

    if(response.Status !== 0 || !response.Answer[0] || response.Answer.length === 0) return serverInfo + `** server can't find ${hostname}: NXDOMAIN\n`;

    let answerSection = `Non-authoritative answer:\n`;

    response.Answer.forEach((answer: any) => {
      const answerName = answer.name.endsWith('.') ? answer.name.slice(0, -1) : answer.name;
      answerSection += `Name:\t\t${answerName}\n`;
      answerSection += `Address:\t${answer.data}\n`;
    });

    return serverInfo + answerSection;
  }

  httpRequestNslookup(executedCommands: typeCommand[], scrollDown: () => void, lookupIndex: number, hostname: string, urlA: string, urlAAAA: string): void {
    forkJoin({
      a: this.httpRequests.http.get(urlA),
      aaaa: this.httpRequests.http.get(urlAAAA)
    }).subscribe(
      (response: { a: any, aaaa: any }) =>  {
        const finalResponse = this.getFinalResponse(response); 
        const data = this.getNslookupResponseData(finalResponse, hostname);
        executedCommands[lookupIndex].output += data;
        scrollDown();
      },
      error => {
        executedCommands[lookupIndex].output += `Error: ${error.message}`;
        scrollDown();
      }
    );
  }
}
