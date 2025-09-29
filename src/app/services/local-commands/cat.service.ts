import { inject, Injectable } from '@angular/core';
import { UtilsService } from '../utils.service';
import { typeCommand, typeDirectory } from '../../types/types';

@Injectable({
  providedIn: 'root'
})
export class CatService {
  utils = inject(UtilsService);

  cat(command: string, executedCommands: typeCommand[], currentPathString: string, currentDirectory: typeDirectory, scrollDown: () => void): void {
    const snapshot = JSON.parse(JSON.stringify(currentDirectory));
    const filesOfDirectory = currentDirectory.files?.filter(dir => dir.name.includes('.txt'));
    const tokens = command.trim().split(' ');
    
    if(!filesOfDirectory) return void executedCommands.push({ command, output: 'No such file in directory', path: currentPathString, snapshot: snapshot });
    if(tokens.length < 2) return void executedCommands.push({ command, output: 'cat: usage error: File name required', path: currentPathString, snapshot: snapshot });
    
    const fileContent = filesOfDirectory.find(dir => dir.name === tokens[1].toLowerCase());
    if(!fileContent) return void executedCommands.push({ command, output: 'No such file in directory', path: currentPathString, snapshot: snapshot });

    executedCommands.push({ command, output: fileContent?.data , path: currentPathString, snapshot: snapshot });
    scrollDown();
  }
}
