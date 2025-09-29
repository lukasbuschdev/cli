import { TestBed } from '@angular/core/testing';

import { TracerouteService } from './traceroute.service';

describe('TracerouteService', () => {
  let service: TracerouteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TracerouteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
