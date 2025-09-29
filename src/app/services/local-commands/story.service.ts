import { inject, Injectable } from '@angular/core';
import { UtilsService } from '../utils.service';
import { typeCommand } from '../../types/types';
import { AVAILABLE_DIRECTORIES } from '../../data/available-directories';

@Injectable({
  providedIn: 'root'
})
export class StoryService {
  utils = inject(UtilsService);

  story(command: string, executedCommands: typeCommand[], currentPathString: string): void {
    const storyText = AVAILABLE_DIRECTORIES[0].subdirectories[0].subdirectories[1].files.find(file => file.name === 'commandline_story.txt');
    executedCommands.push({ command, output: storyText?.data, path: currentPathString });
  }
}
