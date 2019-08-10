import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MealListLineItemComponent } from './meal-list-line-item.component';

describe('MealListLineItemComponent', () => {
  let component: MealListLineItemComponent;
  let fixture: ComponentFixture<MealListLineItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MealListLineItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MealListLineItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
