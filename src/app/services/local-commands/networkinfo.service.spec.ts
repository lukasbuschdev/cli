import { TestBed } from '@angular/core/testing';

import { NetworkinfoService } from './networkinfo.service';

describe('NetworkinfoService', () => {
  let service: NetworkinfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NetworkinfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
