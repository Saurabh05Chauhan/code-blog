import { Injectable } from '@angular/core';
import { LoginRequest } from '../models/login-request-model';
import { Observable } from 'rxjs';
import { LoginResponse } from '../models/login-response';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private API_URL= environment.apiBaseUrl;
  constructor(private http:HttpClient) { }

  login(req:LoginRequest):Observable<LoginResponse>{
    return this.http.post<LoginResponse>(this.API_URL+'auth/login',req);
  }

  setUser(userName:string,roles:string[]){
   localStorage.setItem('userName',userName);
   localStorage.setItem('roles',roles.join(','));
  }
}
