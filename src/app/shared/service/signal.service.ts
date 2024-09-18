import { Injectable, signal, Signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SignalService {

  constructor() { }

  public _isLoggedIn:Signal<string|null>= signal('false');

  get LoginStatus() {
    this._isLoggedIn=signal(localStorage.getItem('token'));
    return this._isLoggedIn;
  }

  Login(flag:any)
  {
    localStorage.setItem('token',flag);
    this._isLoggedIn=signal(localStorage.getItem('token'));
    console.log("set",this._isLoggedIn);
  }

  get Roles(){
    return localStorage.getItem('roles');
  }

  get User(){
    return localStorage.getItem('userName');
  }
}
