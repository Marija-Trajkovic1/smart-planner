import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralNote } from './general-note';

describe('GeneralNote', () => {
  let component: GeneralNote;
  let fixture: ComponentFixture<GeneralNote>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeneralNote],
    }).compileComponents();

    fixture = TestBed.createComponent(GeneralNote);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
