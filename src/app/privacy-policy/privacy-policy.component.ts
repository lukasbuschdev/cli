import { Component, inject } from '@angular/core';
import { ScrollService } from '../services/scroll.service';
import { LanguageService } from '../services/language.service';
import { PrivacyPolicyEnComponent } from './privacy-policy-en/privacy-policy-en.component';
import { PrivacyPolicyEsComponent } from './privacy-policy-es/privacy-policy-es.component';
import { PrivacyPolicyDeComponent } from './privacy-policy-de/privacy-policy-de.component';

@Component({
  selector: 'app-privacy-policy',
  imports: [PrivacyPolicyEnComponent, PrivacyPolicyEsComponent, PrivacyPolicyDeComponent],
  templateUrl: './privacy-policy.component.html',
  styleUrl: './privacy-policy.component.scss'
})
export class PrivacyPolicyComponent {
  scroll = inject(ScrollService);
  language = inject(LanguageService);

  isScrolled: boolean = false;

  private scrollListener = (event: Event): void => {
    this.isScrolled = window.scrollY > 300; 
  };

  ngOnInit(): void {
    window.addEventListener('scroll', this.scrollListener);
  }

  ngOnDestroy(): void {
    window.removeEventListener('scroll', this.scrollListener);
  } 
}
