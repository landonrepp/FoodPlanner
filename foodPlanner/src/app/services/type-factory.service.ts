import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TypeFactoryService {

  constructor() { }
  newMealPlanParameters():MealPlanParameters{
    return {
        cals: null,
        carbs: null,
        fats:null,
        proteins: null
    }

}
}
