import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';

let geturl = 'http://api.landonrepp.com/sql/spget';
let posturl = 'http://api.landonrepp.com/sql/sppost';
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
    const items: Observable<LoginInformation> = this.http.get<LoginInformation>(`${geturl}/login`);
    return items;
  }

}
