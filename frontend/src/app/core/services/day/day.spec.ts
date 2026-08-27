import { TestBed } from '@angular/core/testing';

import { Day } from './day';

describe('Day', () => {
  let service: Day;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Day);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
