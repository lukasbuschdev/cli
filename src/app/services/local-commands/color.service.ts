import { inject, Injectable } from '@angular/core';
import { UtilsService } from '../utils.service';
import { typeCommand } from '../../types/types';

@Injectable({
  providedIn: 'root'
})
export class ColorService {
  utils = inject(UtilsService);

  color(command: string, executedCommands: typeCommand[], currentPathString: string, hostElement: HTMLElement, scrollDown: () => void): void {
    if(command.includes('curl')) return void hostElement.style.setProperty('--txt-white', '#00ff00');

    const terminalContainer = document.querySelector<HTMLElement>('.terminal')!;
    const tokens = command.trim().split(' ');
    const hexRegex = /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6}|[0-9A-Fa-f]{8})$/;
    
    if(tokens.length < 2) return void executedCommands.push({ command, output: `color: usage error: Color code (HEX) required`, path: currentPathString });
    if(tokens[1] === 'reset') return void this.resetColors(command, executedCommands, currentPathString, hostElement, terminalContainer, scrollDown.bind(this));
    if(!hexRegex.test(tokens[1])) return void executedCommands.push({ command, output: `color: usage error: Invalid hex code '${tokens[1]}'\nExpected format: #RGB, #RRGGBB or #RRGGBBAA`, path: currentPathString });
    if(tokens.length > 2) return void this.setBgAndTextColor(tokens, executedCommands, currentPathString, hostElement, terminalContainer, hexRegex);
    if(tokens.length > 3) return void executedCommands.push({ command, output: `color: usage error: Too many operands`, path: currentPathString });

    executedCommands.push({ command, path: currentPathString });
    hostElement.style.setProperty('--txt-white', tokens[1]);
  }

  setBgAndTextColor(tokens: string[], executedCommands: typeCommand[], currentPathString: string, hostElement: HTMLElement, terminalContainer: HTMLElement, hexRegex: RegExp): void {
    const textColor = tokens[1];
    const terminalBg = tokens[2];
    
    executedCommands.push({ command: tokens.join(' '), output: '', path: currentPathString });
    const lastCommandIndex = executedCommands.length - 1;

    if(!hexRegex.test(tokens[1])) {
      executedCommands[lastCommandIndex].output += `color: usage error: Invalid hex code '${tokens[1]}'\nExpected format: #RGB, #RRGGBB or #RRGGBBAA`;
      return;
    } else if(!hexRegex.test(tokens[2])) {
      executedCommands[lastCommandIndex].output += `color: usage error: Invalid hex code '${tokens[2]}'\nExpected format: #RGB, #RRGGBB or #RRGGBBAA`;
      return;
    } 

    hostElement.style.setProperty('--txt-white', textColor);
    terminalContainer.style.setProperty('--terminal-bg', terminalBg);
  }
  
  resetColors(command: string, executedCommands: typeCommand[], currentPathString: string, hostElement: HTMLElement, terminalContainer: HTMLElement, scrollDown: () => void): void {
    if (this.utils.hasExplainFlag(command)) {
      executedCommands.push({ command, output: this.utils.renderExplain('resetColors'), path: currentPathString });
      scrollDown();
      return;
    }

    executedCommands.push({ command, path: currentPathString });

    hostElement.style.setProperty('--txt-white', '#ffffff');
    terminalContainer.style.setProperty('--terminal-bg', '#00080733');
  }
}
