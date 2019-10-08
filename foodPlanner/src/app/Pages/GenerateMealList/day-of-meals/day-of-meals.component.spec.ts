import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DayOfMealsComponent } from './day-of-meals.component';

describe('DayOfMealsComponent', () => {
  let component: DayOfMealsComponent;
  let fixture: ComponentFixture<DayOfMealsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DayOfMealsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DayOfMealsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
