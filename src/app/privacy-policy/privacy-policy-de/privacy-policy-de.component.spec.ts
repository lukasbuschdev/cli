import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivacyPolicyDeComponent } from './privacy-policy-de.component';

describe('PrivacyPolicyDeComponent', () => {
  let component: PrivacyPolicyDeComponent;
  let fixture: ComponentFixture<PrivacyPolicyDeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrivacyPolicyDeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrivacyPolicyDeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
