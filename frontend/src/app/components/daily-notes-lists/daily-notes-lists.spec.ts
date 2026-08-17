import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyNotesLists } from './daily-notes-lists';

describe('DailyNotesLists', () => {
  let component: DailyNotesLists;
  let fixture: ComponentFixture<DailyNotesLists>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DailyNotesLists],
    }).compileComponents();

    fixture = TestBed.createComponent(DailyNotesLists);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
