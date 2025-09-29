import { TestBed } from '@angular/core/testing';

import { UnameService } from './uname.service';

describe('UnameService', () => {
  let service: UnameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UnameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
