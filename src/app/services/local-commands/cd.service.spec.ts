import { TestBed } from '@angular/core/testing';

import { CdService } from './cd.service';

describe('CdService', () => {
  let service: CdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
