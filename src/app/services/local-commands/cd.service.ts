import { inject, Injectable } from '@angular/core';
import { UtilsService } from '../utils.service';
import { typeCommand, typeDirectory } from '../../types/types';

@Injectable({
  providedIn: 'root'
})
export class CdService {
  utils = inject(UtilsService);

  cd(command: string, executedCommands: typeCommand[], currentPathString: string, currentDirectory: typeDirectory, currentDirectoryPath: typeDirectory[], scrollDown: () => void): void {
    if (this.utils.hasExplainFlag(command)) {
      executedCommands.push({ command, output: this.utils.renderExplain('cd'), path: currentPathString });
      scrollDown();
      return;
    }
    
    const tokens = command.trim().split(' ');
    const snapshotPath = currentPathString;
    const snapshot = JSON.parse(JSON.stringify(currentDirectory));

    if(tokens.length < 2) return void executedCommands.push({ command: command, output: 'No such file or directory', path: snapshotPath, snapshot: snapshot });

    const targetDirectory = tokens[1];

    if(targetDirectory === '..') {
      if(currentDirectoryPath.length > 1) {
        currentDirectoryPath.pop();
        return void executedCommands.push({ command, path: snapshotPath, snapshot: snapshot });
      } else return void executedCommands.push({ command, output: 'Already in root directory', path: snapshotPath, snapshot: snapshot });
    } 
    
    if(currentDirectory.subdirectories && currentDirectory.subdirectories.length) {
      const directory = currentDirectory.subdirectories.find(dir => dir.directory === targetDirectory);
      
      if(directory) {
        currentDirectoryPath.push(directory);
        executedCommands.push({ command, path: snapshotPath, snapshot: snapshot });
      } else {
        executedCommands.push({ command: command, output: 'No such directory', path: snapshotPath, snapshot: snapshot });
      }
    } else {
      executedCommands.push({ command: command, output: 'No such directory', path: snapshotPath, snapshot: snapshot });
    }
  }
}
