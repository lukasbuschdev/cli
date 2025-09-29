import { inject, Injectable } from '@angular/core';
import { UtilsService } from '../utils.service';
import { typeCommand, typeDirectory } from '../../types/types';

@Injectable({
  providedIn: 'root'
})
export class TouchService {
  utils = inject(UtilsService);

  touch(command: string, executedCommands: typeCommand[], currentPathString: string, currentDirectory: typeDirectory): void {
    const tokens = command.trim().split(' ');
    const fileNames = tokens.slice(1);

    if(fileNames.length === 0) return void executedCommands.push({ command, output: `touch: missing operand\nTry 'help' for more information`, path: currentPathString });

    executedCommands.push({ command, output: '', path: currentPathString });
    const commandIndex = executedCommands.length - 1;

    for(const name of fileNames) {
      const exists = currentDirectory.files.some(file => file.name === name);
      const isTextFile = name.endsWith('.txt');

      if(exists) {
        executedCommands[commandIndex].output += `touch: cannot create file '${ name }': File exists\n`;
      } else if(!isTextFile) {
        executedCommands[commandIndex].output += `touch: cannot create file '${ name }': Invalid extension; only .txt files are supported\n`;
      } else {
        currentDirectory.files.push({ name, isRootOnly: false, data: '' });
      }
    }
  }
}
