import { TestBed } from '@angular/core/testing';

import { PerfService } from './perf.service';

describe('PerfService', () => {
  let service: PerfService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PerfService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
