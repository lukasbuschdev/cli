import { Component, inject } from '@angular/core';
import { ScrollService } from '../../services/scroll.service';

@Component({
  selector: 'app-privacy-policy-en',
  imports: [],
  templateUrl: './privacy-policy-en.component.html',
  styleUrls: ['./privacy-policy-en.component.scss', '../privacy-policy.component.scss']
})
export class PrivacyPolicyEnComponent {
  scroll = inject(ScrollService);
}
