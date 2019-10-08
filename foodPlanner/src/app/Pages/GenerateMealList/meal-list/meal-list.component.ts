import { Component, OnInit, Input } from '@angular/core';
import { GetNutritionalInformationService, NutritionService } from 'src/app/services/get-nutritional-information.service';


@Component({
  selector: 'app-meal-list',
  templateUrl: './meal-list.component.html',
  styleUrls: ['./meal-list.component.css']
})
export class MealListComponent implements OnInit {
  @Input() mealProperties: NutritionalInformation[] = [];
  mealHeirarchy: NutritionalInformation[][] = [];
  constructor(private http:NutritionService) { }
  daysOfWeek = ["Sunday","Monday","Tuesday","Wednsday","Thursday","Friday","Saturday"];
  ngOnInit() {
    this.http.getWeeklyMeals().subscribe((results)=>{
      this.mealProperties = results;
      for(var i = 0; i<results.length; i+=3){
        this.mealHeirarchy.push(results.slice(i,i+3));
      }
    });
  }

}
