import { TestBed } from '@angular/core/testing';

import { LocalRequestsService } from './local-requests.service';

describe('LocalRequestsService', () => {
  let service: LocalRequestsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalRequestsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
