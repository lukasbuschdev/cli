import { inject, Injectable } from '@angular/core';
import { UtilsService } from '../utils.service';
import { typeCommand } from '../../types/types';

@Injectable({
  providedIn: 'root'
})
export class DateService {
  utils = inject(UtilsService);

  date(command: string, executedCommands: typeCommand[], currentPathString: string): void {
    const output = this.utils.getFormattedDate();
    executedCommands.push({ command, output, path: currentPathString });
  }
}
