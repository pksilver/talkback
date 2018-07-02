import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public baseUrl: string ='http://localhost:3000/api/users';

  constructor(private http: HttpClient) { }

  login(user: any): Observable <any>
    {
       const body = user;
      return this.http.post(`${this.baseUrl}/login`,body);
    }
  signup(user: any): Observable <any>
    {
       const body = user;
      return this.http.post(`${this.baseUrl}/signup`,body);
    }
}
