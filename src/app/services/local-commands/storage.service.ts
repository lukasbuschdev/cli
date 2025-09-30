import { inject, Injectable } from '@angular/core';
import { typeCommand } from '../../types/types';
import { UtilsService } from '../utils.service';

@Injectable({ providedIn: 'root' })
export class StorageService {
  utils = inject(UtilsService);

  storage(command: string, executedCommands: typeCommand[], currentPathString: string): void {
    executedCommands.push({ command, path: currentPathString });
    const i = executedCommands.length - 1;

    let output = '--- Storage Info ---\n';

    // Estimate quota & usage
    if (navigator.storage && navigator.storage.estimate) {
      navigator.storage.estimate().then(estimate => {
        const usage = estimate.usage ?? 0;
        const quota = estimate.quota ?? 0;

        output += `Quota: ${this.formatBytes(quota)}\n`;
        output += `Usage: ${this.formatBytes(usage)}\n`;
        output += `Usage %: ${quota > 0 ? ((usage / quota) * 100).toFixed(2) + '%' : 'N/A'}\n\n`;

        output += '--- LocalStorage ---\n';
        output += this.listStorage(localStorage);

        output += '\n--- SessionStorage ---\n';
        output += this.listStorage(sessionStorage);

        output += '\n--- IndexedDB ---\n';
        output += this.checkIndexedDB();

        executedCommands[i].output = output;
      }).catch(() => {
        executedCommands[i].output = 'Error retrieving storage information.';
      });
    } else {
      executedCommands[i].output = 'Storage API not supported in this browser.';
    }
  }

  private listStorage(storage: Storage): string {
    if (!storage || storage.length === 0) return '(empty)\n';
    let out = '';
    for (let i = 0; i < storage.length; i++) {
      const key = storage.key(i);
      if (!key) continue;
      const value = storage.getItem(key) ?? '';
      out += `${key}: ${this.formatBytes(value.length)}\n`;
    }
    return out;
  }

  private checkIndexedDB(): string {
    try {
      if ('indexedDB' in window) return 'IndexedDB is supported.\n';
      else return 'IndexedDB not supported.\n';
    } catch {
      return 'IndexedDB check failed.\n';
    }
  }

  private formatBytes(bytes: number): string {
    if (bytes === 0) return '0 B';
    
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
}
