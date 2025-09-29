import { TestBed } from '@angular/core/testing';

import { OpensslService } from './openssl.service';

describe('OpensslService', () => {
  let service: OpensslService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpensslService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
