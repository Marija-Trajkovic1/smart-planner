import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralNoteList } from './general-note-list';

describe('GeneralNoteList', () => {
  let component: GeneralNoteList;
  let fixture: ComponentFixture<GeneralNoteList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeneralNoteList],
    }).compileComponents();

    fixture = TestBed.createComponent(GeneralNoteList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
