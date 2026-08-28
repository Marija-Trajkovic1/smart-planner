import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyNotesList } from './daily-notes-list';

describe('DailyNotesList', () => {
  let component: DailyNotesList;
  let fixture: ComponentFixture<DailyNotesList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DailyNotesList],
    }).compileComponents();

    fixture = TestBed.createComponent(DailyNotesList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
