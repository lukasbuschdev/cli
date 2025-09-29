import { TestBed } from '@angular/core/testing';

import { TlschainService } from './tlschain.service';

describe('TlschainService', () => {
  let service: TlschainService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TlschainService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
