import { TestBed } from '@angular/core/testing';

import { RebootService } from './reboot.service';

describe('RebootService', () => {
  let service: RebootService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RebootService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
