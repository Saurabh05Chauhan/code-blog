import { Injectable, signal, Signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SignalService {

  constructor() { }

  //public _isLoggedIn?:'';
  roleAdmin='25dfdf7c-1f0a-493a-bb8f-5a4e39aea87e';
  get LoginStatus() {
    //this._isLoggedIn=localStorage.getItem('userToken');
    if(localStorage.getItem('userToken')){
      return true;
    }
    else{
      return false;
    }
   
  }

  // Login(flag:any)
  // {
  //   //localStorage.setItem('token',flag);
  //   this._isLoggedIn=signal(localStorage.getItem('userToken'));
  //   //console.log("set",this._isLoggedIn);
  // }

  get Roles(){
    var role=localStorage.getItem('userRole');
    if(role==this.roleAdmin){
      return true;
    }
    else{
      return false;
    }
  }

  get User(){
    var user= localStorage.getItem('userName');
    return user;
  }
}
