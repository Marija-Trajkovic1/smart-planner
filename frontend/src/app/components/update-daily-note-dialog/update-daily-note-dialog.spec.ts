import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDailyNoteDialog } from './update-daily-note-dialog';

describe('UpdateDailyNoteDialog', () => {
  let component: UpdateDailyNoteDialog;
  let fixture: ComponentFixture<UpdateDailyNoteDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateDailyNoteDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(UpdateDailyNoteDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
