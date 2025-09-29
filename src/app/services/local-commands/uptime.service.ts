import { inject, Injectable } from '@angular/core';
import { UtilsService } from '../utils.service';
import { typeCommand } from '../../types/types';

@Injectable({
  providedIn: 'root'
})
export class UptimeService {
  utils = inject(UtilsService);

  uptime(command: string, executedCommands: typeCommand[], currentPathString: string): void {
    const output = this.utils.getUptime();
    executedCommands.push({ command, output, path: currentPathString });
  }
}
