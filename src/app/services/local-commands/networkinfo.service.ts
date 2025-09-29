import { inject, Injectable } from '@angular/core';
import { UtilsService } from '../utils.service';
import { typeCommand } from '../../types/types';

@Injectable({
  providedIn: 'root'
})
export class NetworkinfoService {
  utils = inject(UtilsService);

  networkinfo(command: string, executedCommands: typeCommand[], currentPathString: string): void {
    executedCommands.push({ command, path: currentPathString });
    const commandIndex = executedCommands.length - 1;

    const nav: any = navigator;
    const connection =
      nav.connection ||
      nav.mozConnection ||
      nav.webkitConnection ||
      null;

    if (!connection) {
      executedCommands[commandIndex].output = 'Network Information API not supported in this browser.';
      return;
    }

    const downlink = typeof connection.downlink === 'number' ? `${connection.downlink} Mb/s` : 'N/A';
    const effectiveType = connection.effectiveType ?? 'N/A';
    const rtt = typeof connection.rtt === 'number' ? `${connection.rtt} ms` : 'N/A';
    const saveData = connection.saveData ? 'on' : 'off';
    const type = connection.type ?? 'N/A'; // may be undefined/deprecated

    const output =
      `Downlink:\t\t${downlink}\n` +
      `Effective type:\t\t${effectiveType}\n` +
      `RTT:\t\t\t${rtt}\n` +
      `Save-Data:\t\t${saveData}\n` +
      `Type:\t\t\t${type}`;

    executedCommands[commandIndex].output = output;
  }
}
