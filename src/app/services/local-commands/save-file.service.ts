import { inject, Injectable } from '@angular/core';
import { UtilsService } from '../utils.service';
import { typeCommand, typeDirectory } from '../../types/types';
import { LocalRequestsService } from '../local-requests.service';

@Injectable({
  providedIn: 'root'
})
export class SaveFileService {
  utils = inject(UtilsService);
  localRequests = inject(LocalRequestsService);

  saveFile(command: string, executedCommands: typeCommand[], currentPathString: string, currentDirectory: typeDirectory) {
    const realFile = currentDirectory.files.find(f => f.name === this.localRequests.openedFile.name);

    if(realFile) {
      realFile.data = this.localRequests.openedFile.data;
    } else {
      currentDirectory.files.push({ name: this.localRequests.openedFile.name, isRootOnly: false, data: this.localRequests.openedFile.data });
    }

    executedCommands.push({ command: `^${command}`, path: currentPathString });
    this.localRequests.isEditing = false;
  }
}
