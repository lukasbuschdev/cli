import { TestBed } from '@angular/core/testing';

import { NanoService } from './nano.service';

describe('NanoService', () => {
  let service: NanoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NanoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
