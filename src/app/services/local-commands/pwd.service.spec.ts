import { TestBed } from '@angular/core/testing';

import { PwdService } from './pwd.service';

describe('PwdService', () => {
  let service: PwdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PwdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
