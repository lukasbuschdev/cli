import { TestBed } from '@angular/core/testing';

import { MkdirService } from './mkdir.service';

describe('MkdirService', () => {
  let service: MkdirService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MkdirService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
