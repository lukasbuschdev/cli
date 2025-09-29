import { inject, Injectable } from '@angular/core';
import { UtilsService } from '../utils.service';
import { typeCommand } from '../../types/types';

@Injectable({
  providedIn: 'root'
})
export class WhoamiService {
  utils = inject(UtilsService);

  whoami(command: string, executedCommands: typeCommand[], currentPathString: string): void {
    executedCommands.push({ command, output: 'guest', path: currentPathString });
  }
}
