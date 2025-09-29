import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpRequestsService {
  http = inject(HttpClient);

  isFetching: boolean = false;
  isPinging: boolean = false;
}
