import { inject, Injectable } from '@angular/core';
import { UtilsService } from '../utils.service';
import { typeCommand } from '../../types/types';

@Injectable({
  providedIn: 'root'
})
export class PwdService {
  utils = inject(UtilsService);

  pwd(command: string, executedCommands: typeCommand[], currentPathString: string): void {
    executedCommands.push({ command, output: `/root${currentPathString}`, path: currentPathString });
  }
}
