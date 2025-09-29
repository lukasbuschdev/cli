import { inject, Injectable } from '@angular/core';
import { UtilsService } from '../utils.service';
import { HttpRequestsService } from '../http-requests.service';
import { typeCommand } from '../../types/types';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IpaddrService {
  utils = inject(UtilsService);
  httpRequests = inject(HttpRequestsService);

  async ipaddr(command: string, executedCommands: typeCommand[], currentPathString: string, scrollDown: () => void): Promise<void>{
    executedCommands.push({ command, output: '', path: currentPathString });
    this.httpRequests.isFetching = true;
    const ipIndex = executedCommands.length - 1;

    try {
      const ip = await this.getPublicIP();
      executedCommands[ipIndex].output += ip;
      this.httpRequests.isFetching = false;
      scrollDown();
    } catch (error) {
      executedCommands[ipIndex].output += 'Error fetching IP address.';
      this.httpRequests.isFetching = false;
      scrollDown();
    }
  }
  
  getPublicIP(): Promise<string> {
    return firstValueFrom(
      this.httpRequests.http.get<{ ip: string }>('https://api.ipify.org?format=json')
    ).then(response => response.ip);
  }
}
