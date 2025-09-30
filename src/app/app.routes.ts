import { Routes } from '@angular/router';
import { LegalNoticeComponent } from './legal-notice/legal-notice.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';

export const routes: Routes = [
    { path: '', redirectTo: 'cli', pathMatch: 'full' },
    { path: 'privacy-policy', component: PrivacyPolicyComponent },
    { path: 'legal-notice', component: LegalNoticeComponent }
];
