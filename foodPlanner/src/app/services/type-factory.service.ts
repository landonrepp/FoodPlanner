import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TypeFactoryService {

  constructor() { }
  newMealPlanParameters():MealPlanParameters{
    return {
        calories: null,
        carbohydrates: null,
        fat:null,
        protein: null,
        meals: null
    }

}
}
