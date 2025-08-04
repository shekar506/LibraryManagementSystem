import { TestBed } from '@angular/core/testing';

import { Bookissueservice } from './bookissueservice';

describe('Bookissueservice', () => {
  let service: Bookissueservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Bookissueservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
