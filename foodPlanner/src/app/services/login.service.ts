import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import { environment } from '../../environments/environment';

let geturl = environment.apiUrl+'sql/spget';
let posturl = environment.apiUrl+'sql/sppost';
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
    const items: Observable<LoginInformation> = this.http.get<LoginInformation>(`/login/google`);
    return items;
  }
  public getLoginUrl(): Observable<LoginUrls>{
    return this.http.get<LoginUrls>(`${geturl}/auth/geturls`);
  }

}
