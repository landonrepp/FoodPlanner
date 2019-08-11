import { Component, OnInit, Input } from '@angular/core';
import { GetNutritionalInformationService, NutritionService } from 'src/app/services/get-nutritional-information.service';


@Component({
  selector: 'app-meal-list',
  templateUrl: './meal-list.component.html',
  styleUrls: ['./meal-list.component.css']
})
export class MealListComponent implements OnInit {
  @Input() mealProperties: NutritionalInformation[] = [];

  constructor(private http:NutritionService) { }
  ngOnInit() {
    this.http.getWeeklyMeals().subscribe((results)=>{
      this.mealProperties = results;
      console.log(this.mealProperties);
    });
  }

}
