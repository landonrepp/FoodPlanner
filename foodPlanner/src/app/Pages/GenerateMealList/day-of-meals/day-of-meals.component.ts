import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-day-of-meals',
  templateUrl: './day-of-meals.component.html',
  styleUrls: ['./day-of-meals.component.css']
})
export class DayOfMealsComponent implements OnInit {
  @Input() meals: NutritionalInformation[] = [];
  constructor() { }

  ngOnInit() {
  }

}
