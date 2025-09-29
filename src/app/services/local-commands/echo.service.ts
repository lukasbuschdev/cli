import { inject, Injectable } from '@angular/core';
import { UtilsService } from '../utils.service';
import { typeCommand } from '../../types/types';

@Injectable({
  providedIn: 'root'
})
export class EchoService {
  utils = inject(UtilsService);

  echo(command: string, executedCommands: typeCommand[], currentPathString: string): void {
    const printValue = command.trim().split(' ').slice(1).join(' ');
    if(!printValue) return void executedCommands.push({ command, output: '\n', path: currentPathString });
    executedCommands.push({ command, output: printValue, path: currentPathString });
  }
}
