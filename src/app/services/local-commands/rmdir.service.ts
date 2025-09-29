import { inject, Injectable } from '@angular/core';
import { UtilsService } from '../utils.service';
import { typeCommand, typeDirectory } from '../../types/types';

@Injectable({
  providedIn: 'root'
})
export class RmdirService {
  utils = inject(UtilsService);

  rmdir(command: string, executedCommands: typeCommand[], currentPathString: string, currentDirectory: typeDirectory): void {
    const tokens   = command.trim().split(' ');
    const dirNames = tokens.slice(1);
  
    if(dirNames.length === 0) return void executedCommands.push({ command, output: `rmdir: missing operand\nTry 'help' for more information`, path: currentPathString });
  
    executedCommands.push({ command, output: '', path: currentPathString });
    const cmdIndex = executedCommands.length - 1;

    this.checkSubdirectories(executedCommands, currentDirectory, dirNames, cmdIndex);
  }

  checkSubdirectories(executedCommands: typeCommand[], currentDirectory: typeDirectory, dirNames: string[], cmdIndex: number): void {
    for(const name of dirNames) {
      const index = currentDirectory.subdirectories ? currentDirectory.subdirectories.findIndex(dir => dir.directory === name) : -1;
  
      if(index < 0) {
        executedCommands[cmdIndex].output += `rmdir: failed to remove '${ name }': No such file or directory\n`;
        continue;
      }

      const dir = currentDirectory.subdirectories![index];
      const hasFiles = (dir.files.length ?? 0) > 0;
      const hasSubdirectories = (dir.subdirectories.length ?? 0) > 0;

      if(hasFiles || hasSubdirectories) {
        executedCommands[cmdIndex].output += `rmdir: failed to remove '${ name }': Directory not empty\n`;
      } else {
        currentDirectory.subdirectories!.splice(index, 1);
      }
    }
  }
}
