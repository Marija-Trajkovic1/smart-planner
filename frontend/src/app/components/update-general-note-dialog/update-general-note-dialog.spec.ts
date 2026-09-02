import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateGeneralNoteDialog } from './update-general-note-dialog';

describe('UpdateGeneralNoteDialog', () => {
  let component: UpdateGeneralNoteDialog;
  let fixture: ComponentFixture<UpdateGeneralNoteDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateGeneralNoteDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(UpdateGeneralNoteDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
