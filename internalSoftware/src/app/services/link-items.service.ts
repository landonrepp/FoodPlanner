import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import {Product} from '../types/Products';
import { Ingredient } from '../types/Ingredient';

var url = 'http://localhost:8000';
@Injectable({
  providedIn: 'root'
})

export class LinkItemsService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Access-Control-Allow-Origin': '*'
      // 'Authorization': 'my-auth-token'
    })
  };
  
  constructor(private http: HttpClient) { 
    
  }

  // get line items
  public getProducts(val:string): Observable<Product[]>{
    const items: Observable<Product[]> = this.http.post<Product[]>(`${url}/sql/sppost/usp_getProducts`,{
      "strNames": val
    });
    return items;
  }
  public getUnlinkedIngredient(): Observable<Ingredient[]>{
    const items: Observable<Ingredient[]> = this.http.get<Ingredient[]>(`${url}/sql/spget/getUnlinkedIngredient`);
    return items;
  }
  // setIngredientProperty
  public setIngredientProperties(properties:any):Observable<string>{
    const items: Observable<string> = this.http.post<string>(`${url}/sql/sppost/setIngredientProperty`,properties);
    return items;
  }
}
