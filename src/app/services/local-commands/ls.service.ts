import { inject, Injectable } from '@angular/core';
import { UtilsService } from '../utils.service';
import { typeCommand, typeDirectory } from '../../types/types';
import { LocalRequestsService } from '../local-requests.service';

@Injectable({
  providedIn: 'root'
})
export class LsService {
  utils = inject(UtilsService);
  localRequests = inject(LocalRequestsService);
  
  ls(command: string, executedCommands: typeCommand[], currentPathString: string, currentDirectory: typeDirectory): void {
    const tokens = command.trim().split(' ');
    if(tokens.length > 1) return void executedCommands.push({ command, output: `ls: usage error: extra operand '${ tokens[1] }'\nTry 'help' for more information`, path: currentPathString});

    const snapshot = JSON.parse(JSON.stringify(currentDirectory));
    const files = this.localRequests.hasRootPermissions ? (currentDirectory.files?.map(file => file.name) ?? []) : currentDirectory.files.filter(file => !file.isHidden).map(file => file.name);
    const subdirectories = currentDirectory.subdirectories?.map(dir => dir.directory) ?? [];
    const output = [...files, ...subdirectories];
    const outputString = output.length ? output.join('   ') : ''; // three spaces inbetween
    
    executedCommands.push({ command, output: outputString, path: currentPathString, snapshot: snapshot });
  }
}
