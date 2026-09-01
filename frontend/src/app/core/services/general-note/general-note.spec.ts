import { TestBed } from '@angular/core/testing';

import { GeneralNote } from './general-note';

describe('GeneralNote', () => {
  let service: GeneralNote;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeneralNote);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
