import { Component, inject } from '@angular/core';
import { ScrollService } from '../../services/scroll.service';

@Component({
  selector: 'app-privacy-policy-de',
  imports: [],
  templateUrl: './privacy-policy-de.component.html',
  styleUrls: ['./privacy-policy-de.component.scss', '../privacy-policy.component.scss']
})
export class PrivacyPolicyDeComponent {
  scroll = inject(ScrollService);
}
