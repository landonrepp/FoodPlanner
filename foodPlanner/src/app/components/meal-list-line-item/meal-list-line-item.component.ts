import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-meal-list-line-item',
  templateUrl: './meal-list-line-item.component.html',
  styleUrls: ['./meal-list-line-item.component.css']
})
export class MealListLineItemComponent implements OnInit {
  @Input() mealProperty: NutritionalInformation;
  json = JSON;
  Window = window;
  constructor() { }

  ngOnInit() {
  }

}
