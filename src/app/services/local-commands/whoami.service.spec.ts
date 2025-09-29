import { TestBed } from '@angular/core/testing';

import { WhoamiService } from './whoami.service';

describe('WhoamiService', () => {
  let service: WhoamiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WhoamiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
