import { inject, Injectable } from '@angular/core';
import { UtilsService } from '../utils.service';
import { typeCommand } from '../../types/types';

@Injectable({
  providedIn: 'root'
})
export class BatteryService {
  utils = inject(UtilsService);

  battery(command: string, executedCommands: typeCommand[], currentPathString: string): void {
    executedCommands.push({ command, path: currentPathString });
    const commandIndex = executedCommands.length - 1;

    if ('getBattery' in navigator) {
      (navigator as any).getBattery().then((battery: any) => {
        const output =
          `Battery level:\t\t${Math.round(battery.level * 100)}%\n` +
          `Charging:\t\t${battery.charging ? 'yes' : 'no'}\n`;

        executedCommands[commandIndex].output = output;
      }).catch(() => {
        executedCommands[commandIndex].output = 'Error retrieving battery info.';
      });
    } else {
      executedCommands[commandIndex].output = 'Battery API not supported in this browser.';
    }
  }
}
