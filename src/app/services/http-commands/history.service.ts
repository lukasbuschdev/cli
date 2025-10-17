import { inject, Injectable } from '@angular/core';
import { UtilsService } from '../utils.service';
import { HttpRequestsService } from '../http-requests.service';
import { typeCommand } from '../../types/types';
import { HttpResponse } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class HistoryService {
  utils = inject(UtilsService);
  httpRequests = inject(HttpRequestsService);

  history(command: string, executedCommands: typeCommand[], currentPathString: string, scrollDown: () => void): void {
    executedCommands.push({ command, output: 'Fetching command history...\n', path: currentPathString });
    const idx = executedCommands.length - 1;

    const url = `https://proxy.lukasbusch.dev/history?limit=${this.getLimit(command)}`;

    this.httpRequests.isFetching = true;
    this.httpRequests.http.get<any>(url, { observe: 'response' }).subscribe({
      next: (res: HttpResponse<any>) => {
        const rows = (res.body?.rows || []) as Array<{ command: string; path?: string; created_at?: string }>;

        if (!rows.length) {
          executedCommands[idx].output = `No history entries.\n`;
          this.httpRequests.isFetching = false;
          scrollDown();
          return;
        }
        
        const lines = rows.map((r, i) => {
          const date = new Date(Number(r.created_at) * 1000);
          return `${i + 1}\t${this.utils.formatTimestamp(date)}\t${r.command}`
        });

        executedCommands[idx].output = lines.join('\n') + '\n';
      
        this.httpRequests.isFetching = false;
        scrollDown();
      },
      error: (err) => {
        executedCommands[idx].output = `history: error: ${err?.error?.error || err?.message || 'Unknown error'}\n`;
        this.httpRequests.isFetching = false;
        scrollDown();
      }
    });
  }

  getLimit(command: string): number {
    const tokens = command.trim().split(/\s+/);
    const raw = tokens[1];
    let limit = 1000;
    
    if (raw !== undefined) {
      const n = Number(raw);

      if (Number.isFinite(n) && n > 0) {
        limit = Math.min(Math.floor(n), 10000);
      }
    }

    return limit;
  }
}
