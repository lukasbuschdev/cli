import { TestBed } from '@angular/core/testing';

import { RmService } from './rm.service';

describe('RmService', () => {
  let service: RmService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RmService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
