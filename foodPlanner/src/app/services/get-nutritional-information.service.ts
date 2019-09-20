import { Injectable, NgModule } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';


// @Injectable({
//   providedIn: 'root'
// })
export class GetNutritionalInformationService {

  constructor() { }
}
var url = 'http://api.landonrepp.com/sql/spget';
url = "http://localhost:8000/sql/spget";
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
    const items: Observable<NutritionalInformation[]> = this.http.get<NutritionalInformation[]>(`${url}/getWeekOfMeals`);
    return items;
  }
 
}