import { TestBed } from '@angular/core/testing';

import { ReverseipService } from './reverseip.service';

describe('ReverseipService', () => {
  let service: ReverseipService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReverseipService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
