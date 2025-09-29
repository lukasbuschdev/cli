import { TestBed } from '@angular/core/testing';

import { NslookupService } from './nslookup.service';

describe('NslookupService', () => {
  let service: NslookupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NslookupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
