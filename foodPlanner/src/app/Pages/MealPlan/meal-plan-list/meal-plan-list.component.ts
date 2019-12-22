import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/modal-service.service';
import { GetNutritionalInformationService, NutritionService } from 'src/app/services/get-nutritional-information.service';
import { throwError } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-meal-plan-list',
  templateUrl: './meal-plan-list.component.html',
  styleUrls: ['./meal-plan-list.component.css']
})
export class MealPlanListComponent implements OnInit {
  meals:NutritionalInformation[][];
  displayedMeals:any[][];
  flattenedMeals: any[];
  json = JSON;

  constructor(private modalService:ModalService, private http:NutritionService) { 
  }

  ngOnInit() {
    
  }
  ngAfterViewInit(){
    this.modalService.open('prompt');
  }
  eventFromChild(data:MealPlanParameters):void{
    this.http.getMealPlan(data).subscribe((results)=>{
      
      results = this.transpose(results);
      this.meals = results;
      this.displayedMeals = results;
      // flatten array
      this.flattenedMeals = [].concat(...this.meals);
      
      //get distinct flattened meals
      const map = new Map();
      const _tmpFlatArray = [];
      for(const i of this.flattenedMeals){
        if(!map.has(i.recipeID)){
          //TODO
          map.set(i.recipeID,true);
          _tmpFlatArray.push(i);
        }
      }
      this.flattenedMeals = _tmpFlatArray;
    })
  }
  transpose(arr:any[][]):any[][]{
    return arr[0].map((col, i) => arr.map(row => row[i]));
  }
}
