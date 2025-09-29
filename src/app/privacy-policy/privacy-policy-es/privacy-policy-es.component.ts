import { Component, inject } from '@angular/core';
import { ScrollService } from '../../services/scroll.service';

@Component({
  selector: 'app-privacy-policy-es',
  imports: [],
  templateUrl: './privacy-policy-es.component.html',
  styleUrls: ['./privacy-policy-es.component.scss', '../privacy-policy.component.scss']
})
export class PrivacyPolicyEsComponent {
  scroll = inject(ScrollService);
}
