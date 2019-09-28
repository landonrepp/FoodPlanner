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
getUrl = environment.apiUrl+"sql/spget";
postUrl = environment.apiUrl+"sql/sppost";
@Injectable({providedIn: 'root'})
export class NutritionService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Access-Control-Allow-Origin': '*'
      // 'Authorization': 'my-auth-token'
    })
  };
  constructor(private http: HttpClient) { }

  // get line items
  public getWeeklyMeals(): Observable<NutritionalInformation[]>{
    const items: Observable<NutritionalInformation[]> = this.http.get<NutritionalInformation[]>(`${getUrl}/getWeekOfMeals`);
    return items;
  }
  public getMealPlan(mealPlanParameters:MealPlanParameters): Observable<MealPlan[]>{
    const items: Observable<MealPlan[]> = this.http.post<MealPlan[]>(`${postUrl}/getMealPlan`,mealPlanParameters);
    return items;
  }
}