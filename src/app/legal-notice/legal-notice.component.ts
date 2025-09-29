import { Component, inject } from '@angular/core';
import { ScrollService } from '../services/scroll.service';
import { TranslatePipe } from '../pipe/translate.pipe';

@Component({
  selector: 'app-legal-notice',
  imports: [TranslatePipe],
  templateUrl: './legal-notice.component.html',
  styleUrl: './legal-notice.component.scss'
})
export class LegalNoticeComponent {
  scroll = inject(ScrollService);
}
