import { TestBed } from '@angular/core/testing';

import { RmdirService } from './rmdir.service';

describe('RmdirService', () => {
  let service: RmdirService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RmdirService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
