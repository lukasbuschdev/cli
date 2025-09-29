import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  isVisible: boolean = false;

  showDialog(): void {
    this.isVisible = true;

    setTimeout(() => {
      this.isVisible = false;
    }, 5000);
  }
}
