import { TestBed } from '@angular/core/testing';

import { DailyNoteService } from './daily-note-service';

describe('DailyNoteService', () => {
  let service: DailyNoteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DailyNoteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
