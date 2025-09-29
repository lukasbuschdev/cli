import { inject, Injectable } from '@angular/core';
import { UtilsService } from '../utils.service';
import { typeCommand } from '../../types/types';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  utils = inject(UtilsService);
  
  history(command: string, executedCommands: typeCommand[], currentPathString: string): void {
    const commandHistory = this.getCommandHistory(executedCommands);
    executedCommands.push({ command, output: commandHistory, path: currentPathString });
  }

  getCommandHistory(executedCommands: typeCommand[]): string {
    let allCommands = '';
    let count = 0;

    executedCommands.forEach(command => {
      count++;
      allCommands += `${count}\t${command.command}\n`
    });

    return allCommands;
  }
}
