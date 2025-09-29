import { inject, Injectable } from '@angular/core';
import { UtilsService } from '../utils.service';
import { typeCommand, typeDirectory, typeFile } from '../../types/types';
import { LocalRequestsService } from '../local-requests.service';

@Injectable({
  providedIn: 'root'
})
export class NanoService {
  utils = inject(UtilsService);
  localRequests = inject(LocalRequestsService);

  nano(command: string, executedCommands: typeCommand[], currentPathString: string, currentDirectory: typeDirectory, focusNanoInput: () => void): void { 
    const snapshot = JSON.parse(JSON.stringify(currentDirectory));
    const filesOfDirectory = currentDirectory.files?.filter(dir => dir.name.includes('.txt'));
    const tokens = command.trim().split(' ');
    
    if(tokens.length < 2) return void executedCommands.push({ command, output: 'nano: usage error: File name required', path: currentPathString, snapshot: snapshot });
    if(!command.endsWith('.txt')) return void executedCommands.push({ command, output: `nano: usage error: File extension '.txt' required`, path: currentPathString, snapshot: snapshot });
    if(tokens.length > 2) return void executedCommands.push({ command, output: `nano: too many arguments\nTry 'help' for more information`, path: currentPathString, snapshot: snapshot });
    
    const fileContent = filesOfDirectory.find(dir => dir.name === tokens[1].toLowerCase());
    if(fileContent?.isRootOnly && !this.localRequests.hasRootPermissions) return void executedCommands.push({ command, output: `Error opening '${ currentPathString }/${ fileContent.name }': Permission denied`, path: currentPathString, snapshot: snapshot });

    this.checkFileContent(command, executedCommands, currentPathString, fileContent, tokens, snapshot, focusNanoInput);
  }

  checkFileContent(command: string, executedCommands: typeCommand[], currentPathString: string, fileContent: typeFile | undefined, tokens: string[], snapshot: typeDirectory, focusNanoInput: () => void): void {
    if(fileContent) {
      this.localRequests.openedFile = { name: fileContent.name, isRootOnly: fileContent.isRootOnly, data: fileContent.data };
    } else {
      this.localRequests.openedFile = { name: tokens[1], isRootOnly: false, data: '' };
    }

    this.localRequests.isEditing = true;
    executedCommands.push({ command, path: currentPathString, snapshot });
    focusNanoInput();
  }
}
