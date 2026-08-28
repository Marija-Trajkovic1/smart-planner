import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DayDialog } from './day-dialog';

describe('DayDialog', () => {
  let component: DayDialog;
  let fixture: ComponentFixture<DayDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DayDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(DayDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
