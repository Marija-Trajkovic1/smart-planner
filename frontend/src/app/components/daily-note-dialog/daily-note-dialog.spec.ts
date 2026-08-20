import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyNoteDialog } from './daily-note-dialog';

describe('DailyNoteDialog', () => {
  let component: DailyNoteDialog;
  let fixture: ComponentFixture<DailyNoteDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DailyNoteDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(DailyNoteDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
