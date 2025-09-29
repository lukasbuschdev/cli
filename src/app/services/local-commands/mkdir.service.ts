import { inject, Injectable } from '@angular/core';
import { UtilsService } from '../utils.service';
import { typeCommand, typeDirectory } from '../../types/types';

@Injectable({
  providedIn: 'root'
})
export class MkdirService {
  utils = inject(UtilsService);

  mkdir(command: string, executedCommands: typeCommand[], currentPathString: string, currentDirectory: typeDirectory): void {
    const tokens = command.trim().split(' ');
    const dirNames = tokens.slice(1);

    if(dirNames.length === 0) return void executedCommands.push({ command, output: `mkdir: missing operand\nTry 'help' for more information`, path: currentPathString });
    
    executedCommands.push({ command, output: '', path: currentPathString });
    const commandIndex = executedCommands.length - 1;

    for(const name of dirNames) {
      const exists = currentDirectory.subdirectories?.some(dir => dir.directory === name);
  
      if(exists) {
        executedCommands[commandIndex].output += `mkdir: cannot create directory '${ name }': File exists\n`;
      } else if(name.includes('.')) {
        executedCommands[commandIndex].output += `mkdir: cannot create directory '${ name }': Invalid extension\n`;
      } else {
        currentDirectory.subdirectories!.push({ directory: name, subdirectories: [], files: [] });
      }
    }
  }
}
