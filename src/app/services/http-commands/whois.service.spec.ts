import { TestBed } from '@angular/core/testing';

import { WhoisService } from './whois.service';

describe('WhoisService', () => {
  let service: WhoisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WhoisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
