import { TestBed } from '@angular/core/testing';
import { GeneralNoteService } from './general-note';



describe('GeneralNoteService', () => {
  let service: GeneralNoteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeneralNoteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
