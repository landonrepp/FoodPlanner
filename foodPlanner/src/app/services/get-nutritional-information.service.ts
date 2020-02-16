import { Injectable, NgModule } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import { environment } from '../../environments/environment';

// @Injectable({
//   providedIn: 'root'
// })
export class GetNutritionalInformationService {

  constructor() { }
}
let getUrl = environment.apiUrl+'spget';
let postUrl = environment.apiUrl+'sql/sppost';
getUrl = environment.apiUrl+"meals";
postUrl = environment.apiUrl+"sql/sppost";
@Injectable({providedIn: 'root'})
export class NutritionService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Access-Control-Allow-Origin': '*',
      // 'Authorization': 'my-auth-token',
    }),
    withCredentials: true
  };
  constructor(private http: HttpClient) { }

  // get line items
  public getWeeklyMeals(): Observable<NutritionalInformation[]>{
    const items: Observable<NutritionalInformation[]> = this.http.get<NutritionalInformation[]>(`/meals/getWeekOfMeals`,this.httpOptions);
    return items;
  }
  public getMealPlan(mealPlanParameters:MealPlanParameters): Observable<NutritionalInformation[][]>{
    mealPlanParameters.meals = 3;
    const items: Observable<NutritionalInformation[][]> = this.http.post<NutritionalInformation[][]>(`/meals/getMealPlan`,mealPlanParameters,{ withCredentials: true});
    return items;
  }
}