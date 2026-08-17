import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyNote } from './daily-note';

describe('DailyNote', () => {
  let component: DailyNote;
  let fixture: ComponentFixture<DailyNote>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DailyNote],
    }).compileComponents();

    fixture = TestBed.createComponent(DailyNote);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
