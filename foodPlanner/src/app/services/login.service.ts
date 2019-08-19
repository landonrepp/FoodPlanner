import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';

let url = 'http://api.landonrepp.com/sql/spget';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Access-Control-Allow-Origin': '*'
      // 'Authorization': 'my-auth-token'
    })
  };
  constructor(private http: HttpClient) { }

  // get line items
  public tryLogin(username:string,password:string): Observable<LoginInformation>{
    const items: Observable<LoginInformation> = this.http.get<LoginInformation>(`${url}/login`);
    return items;
  }

}
