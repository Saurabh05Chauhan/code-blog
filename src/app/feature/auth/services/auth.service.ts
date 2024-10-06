import { Injectable } from '@angular/core';
import { LoginRequest } from '../models/login-request-model';
import { Observable } from 'rxjs';
import { LoginResponse } from '../models/login-response';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Auth, signInWithPopup, GoogleAuthProvider, signOut } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { user } from '../models/user';
import { userRequest } from '../models/user-request';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private API_URL= environment.apiBaseUrl;
  constructor(private auth: Auth, private router: Router,private client:HttpClient) { }

  async googleSignIn() {
    try {
      const provider = new GoogleAuthProvider();
      const credential = await signInWithPopup(this.auth, provider);
      //console.log('User logged in:', credential.user);
      if (credential.user) {
        console.log(credential.user);
        // Get the token of the authenticated user
        const token = await credential.user.getIdToken();
        let userName = await credential.user.displayName;
        const uid=await credential.user.uid;
        if(userName){
          debugger
          this.addUser(userName,uid).subscribe((res)=>{
            //console.log(res); 
            localStorage.setItem('userRole', res.Role);
          })
        }else{
          userName='NN';
        }
        
        
        // Save the token in localStorage or sessionStorage
        localStorage.setItem('userToken', token);
        localStorage.setItem('userName', userName);

       // console.log('User token saved:', token);
        this.router.navigate(['/']);
      }
      //this.router.navigate(['/dashboard']);
    } catch (error) {
      console.error('Error during sign-in:', error);
    }
  }

  // Sign-out
  async signOut() {
    await signOut(this.auth);
    localStorage.removeItem('userToken');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userName');


    this.router.navigate(['/']);
  }

  addUser(userName:string,uid:string):Observable<user>{
    const user:userRequest={
      UserName:userName,
      Uid:uid
    }
   //localStorage.setItem('userName',userName);
    return this.client.post<user>(this.API_URL+'User',user);
  }
}
