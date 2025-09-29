import { TestBed } from '@angular/core/testing';

import { IpaddrService } from './ipaddr.service';

describe('IpaddrService', () => {
  let service: IpaddrService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IpaddrService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
