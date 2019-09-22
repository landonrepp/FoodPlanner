import { Injectable, NgModule } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';


// @Injectable({
//   providedIn: 'root'
// })
export class GetNutritionalInformationService {

  constructor() { }
}
let getUrl = 'http://api.landonrepp.com/sql/spget';
let postUrl = 'http://api.landonrepp.com/sql/sppost';
getUrl = "http://localhost:8000/sql/spget";
postUrl = "http://localhost:8000/sql/sppost";
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
  public getMealPlan(mealPlanParameters:MealPlanParameters): Observable<NutritionalInformation[]>{
    const items: Observable<NutritionalInformation[]> = this.http.post<NutritionalInformation[]>(`${getUrl}/getMealPlan`,mealPlanParameters);
    return items;
  }
}