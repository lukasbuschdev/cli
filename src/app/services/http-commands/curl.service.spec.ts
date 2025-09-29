import { TestBed } from '@angular/core/testing';

import { CurlService } from './curl.service';

describe('CurlService', () => {
  let service: CurlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
