import { inject, Injectable } from '@angular/core';
import { UtilsService } from '../utils.service';
import { typeCommand } from '../../types/types';

@Injectable({
  providedIn: 'root'
})
export class UnameService {
  utils = inject(UtilsService);

  uname(command: string, executedCommands: typeCommand[], currentPathString: string): void {
    const nav = window.navigator;
    const conn = (nav as any).connection || {};
    const info = [
      `userAgent:          ${nav.userAgent}`,
      `vendor:             ${nav.vendor}`,
      `platform:           ${nav.platform}`,
      `appVersion:         ${nav.appVersion}`,
      `language:           ${nav.language}`,
      `languages:          ${(nav.languages || []).join(', ')}`,
      `online:             ${nav.onLine}`,
      `cookiesEnabled:     ${nav.cookieEnabled}`,
      `cores:              ${nav.hardwareConcurrency}`,
      `deviceMemory:       ${(nav as any).deviceMemory ?? 'n/a'} GB`,
      `connectionType:     ${conn.effectiveType ?? 'n/a'}`,
      `downlink:           ${conn.downlink ?? 'n/a'} Mb/s`,
      `rtt:                ${conn.rtt ?? 'n/a'} ms`,
      `screenResolution:   ${screen.width}x${screen.height}`,
      `viewportSize:       ${window.innerWidth}x${window.innerHeight}`,
      `timezone:           ${Intl.DateTimeFormat().resolvedOptions().timeZone}`,
      `pageUptime:         ${(window.performance.now() / 1000).toFixed(1)} s`
    ];

    executedCommands.push({ command, output: info.join('\n'), path: currentPathString });
  }
}
