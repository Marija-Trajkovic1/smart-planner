import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DayList } from './day-list';

describe('DayList', () => {
  let component: DayList;
  let fixture: ComponentFixture<DayList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DayList],
    }).compileComponents();

    fixture = TestBed.createComponent(DayList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
