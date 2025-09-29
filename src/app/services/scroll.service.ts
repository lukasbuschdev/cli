import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {
  router = inject(Router);

  scrollToSection(id: string): void {
    const section = document.getElementById(id);
    if(!section) return;

    section.scrollIntoView({ behavior: 'smooth' });
  }

  goToSection(component: string, section?: string, inputFieldId?: string): void {
    if(this.router.url !== component) {
      this.router.navigate([component]);
    } 

    if(!section) return;

    setTimeout(() => {
      this.scrollToSection(section);
      if(!inputFieldId) return;
      this.focusInputField(inputFieldId);
    }, 100);
  }

  focusInputField(inputFieldId: string): void {
    document.getElementById(inputFieldId)?.focus({ preventScroll: true });
  }
}
