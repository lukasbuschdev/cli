import { TestBed } from '@angular/core/testing';

import { DigService } from './dig.service';

describe('DigService', () => {
  let service: DigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
