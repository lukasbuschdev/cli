import { inject, Injectable } from '@angular/core';
import { UtilsService } from '../utils.service';
import { typeCommand } from '../../types/types';

@Injectable({
  providedIn: 'root'
})
export class HelpService {
  utils = inject(UtilsService);

  help(command: string, executedCommands: typeCommand[], currentPathString: string): void {
    executedCommands.push({ command, path: currentPathString });
  }
}
