import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateGeneralNoteDialog } from './create-general-note-dialog';

describe('CreateGeneralNoteDialog', () => {
  let component: CreateGeneralNoteDialog;
  let fixture: ComponentFixture<CreateGeneralNoteDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateGeneralNoteDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateGeneralNoteDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
