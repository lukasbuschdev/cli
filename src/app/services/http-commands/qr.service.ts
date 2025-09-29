import { inject, Injectable } from '@angular/core';
import { UtilsService } from '../utils.service';
import { HttpRequestsService } from '../http-requests.service';
import { typeCommand } from '../../types/types';

@Injectable({
  providedIn: 'root'
})
export class QrService {
  utils = inject(UtilsService);
  httpRequests = inject(HttpRequestsService);

  qrPath: string = '';
  
  qr(command: string, executedCommands: typeCommand[], currentPathString: string, scrollDown: () => void): void {
    const tokens = command.trim().split(' ');

    if(!this.checkQrInput(command, executedCommands, currentPathString, scrollDown, tokens)) return;
    executedCommands.push({ command, output: `QR creation for ${tokens[1]} in progress...\n`, path: currentPathString });

    const traceIndex = executedCommands.length - 1;
    this.httpRequests.isFetching = true;

    const raw = tokens[1].startsWith('http://') || tokens[1].startsWith('https://') ? tokens[1] : `https://${tokens[1]}`;
    const fetchUrl = 'https://proxy.lukasbusch.dev/qr?data=' + encodeURIComponent(raw);
    this.qrPath = fetchUrl;

    const tester = new Image();
    const done = (ok: boolean, msg: string) => {
      this.httpRequests.isFetching = false;
      if(ok) {
        executedCommands[traceIndex].output = '';
        executedCommands[traceIndex].qrPath = fetchUrl;
      } else {
        executedCommands[traceIndex].output = msg || 'qr: failed to load image';
        this.qrPath = '';
      }
      scrollDown();
    }

    tester.onload = () => done(true, '');
    tester.onerror = () => done(false, `qr: failed to load image for ${raw}`);
    tester.src = fetchUrl;
  }

  checkQrInput(command: string, executedCommands: typeCommand[], currentPathString: string, scrollDown: () => void, tokens: string[]): boolean {
    if(tokens.length < 2) {
      executedCommands.push({ command, output: 'qr: usage error: Target address required', path: currentPathString });
      scrollDown();
      return false;
    }
    return true;
  }
}
