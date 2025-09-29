import { TestBed } from '@angular/core/testing';

import { AsnService } from './asn.service';

describe('AsnService', () => {
  let service: AsnService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AsnService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
