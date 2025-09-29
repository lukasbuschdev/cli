import { inject, Injectable } from '@angular/core';
import { UtilsService } from '../utils.service';
import { typeCommand, typeDirectory } from '../../types/types';
import { LocalRequestsService } from '../local-requests.service';

@Injectable({
  providedIn: 'root'
})
export class RmService {
  utils = inject(UtilsService);
  localRequests = inject(LocalRequestsService);

  rm(command: string, executedCommands: typeCommand[], currentPathString: string, currentDirectory: typeDirectory): void {
    const tokens   = command.trim().split(' ');
    const fileNames = tokens.slice(1);
  
    if(fileNames.length === 0) return void executedCommands.push({ command, output: `rm: missing operand\nTry 'help' for more information`, path: currentPathString });
    if(!this.localRequests.hasRootPermissions) return void executedCommands.push({ command, output: `rm: error: Permission denied`, path: currentPathString });
  
    executedCommands.push({ command, output: '', path: currentPathString });
    const commandIndex = executedCommands.length - 1;

    this.checkFiles(executedCommands, currentDirectory, fileNames, commandIndex);
  }

  checkFiles(executedCommands: typeCommand[], currentDirectory: typeDirectory, dirNames: string[], commandIndex: number): void {
    for(const name of dirNames) {
      const index = currentDirectory.files ? currentDirectory.files.findIndex(file => file.name === name) : -1;
  
      if(index < 0) {
        executedCommands[commandIndex].output += `rm: failed to remove '${ name }': No such file in directory\n`;
        continue;
      }

      currentDirectory.files.splice(index, 1);
    }
  }
}
