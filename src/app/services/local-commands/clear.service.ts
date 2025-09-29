import { inject, Injectable } from '@angular/core';
import { UtilsService } from '../utils.service';
import { typeCommand } from '../../types/types';

@Injectable({
  providedIn: 'root'
})
export class ClearService {
  utils = inject(UtilsService);

  clear(executedCommands: typeCommand[]): void {
    executedCommands.length = 0;
  }
}
