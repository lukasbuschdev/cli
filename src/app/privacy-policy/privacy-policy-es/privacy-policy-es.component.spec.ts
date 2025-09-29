import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivacyPolicyEsComponent } from './privacy-policy-es.component';

describe('PrivacyPolicyEsComponent', () => {
  let component: PrivacyPolicyEsComponent;
  let fixture: ComponentFixture<PrivacyPolicyEsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrivacyPolicyEsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrivacyPolicyEsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
