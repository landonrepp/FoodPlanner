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
  colors:string[] = ['#e6194B', '#3cb44b', '#ffe119', '#4363d8', '#f58231', '#42d4f4', '#f032e6', '#fabebe', '#469990', '#e6beff', '#9A6324', '#fffac8', '#800000', '#aaffc3', '#000075', '#a9a9a9', '#ffffff', '#000000'];
  meals:any[][];
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
      
      this.meals = this.processResults(results);
      this.displayedMeals = this.getDisplayResults(this.meals);
      // flatten array
      this.flattenedMeals = [].concat(...this.meals);
      console.log(this.flattenedMeals);
    })
  }
  transpose(arr:any[][]):any[][]{
    return arr[0].map((col, i) => arr.map(row => row[i]));
  }
  // split single array into multiple subarrays, each subarray representing a single meal.
  // todo: gneralize this function to take any number of meals. will probably have to change the sp that gets this data
  processResults(results):any[]{
    if(results.length==0){
      throwError("invalid input");
    }
    results = results[0];
    const resultKeys:string[] = Object.keys(results);
    // console.log(results)
    // console.log(resultKeys.length);
    let splitArray:any[] = [];
    let subArray = [];
    let subObject = {};
    for(let i = 0; i<resultKeys.length; i+=9){

      subObject = {};
      for(let j = 0; j<9; j++){
        subObject[resultKeys[i+j].substring(2).toLowerCase()]=results[resultKeys[i+j]];
      }
      // mealNumber represents the order that meals are printed on the page
      subObject["mealNumber"] = i/9+1;
      // mealColor for displaying meals in the grid
      subObject["mealColor"] = this.colors[(i/9)%this.colors.length];
      // console.log(subObject)
      subArray.push({...subObject});

      if((i/9)%3==2){
        splitArray.push([...subArray]);
        subArray = [];
      }
    }
    return splitArray;

  }
  getDisplayResults(processedResults:any[][]):any[][]{
    console.log(processedResults);

    // assumptions:processedResults creates 7 servings per meal/week with 3 meals in its inner most array
    //we want to expand the results so each serving lives in an individual cell
    let data:any[][] = [];
    // assume the array is rectangular
    for(let i = 0;i<processedResults[0].length;i++){
      data.push([]);
    }
    processedResults.forEach(res=>{
      for(let i = 0; i<res.length; i++){
        for(let j = 0; j<res[i]["servings"];j++){
          data[i].push({...res[i]});
        }
      }
    });
    // transpose data
    data = this.transpose(data);
    console.log(data);
    return data;
  }
}
