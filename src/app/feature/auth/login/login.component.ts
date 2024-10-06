import { Component, OnInit } from '@angular/core';
import { LoginRequest } from '../models/login-request-model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { LoginResponse } from '../models/login-response';
import { Observable } from 'rxjs';
import { COOKIE_OPTIONS, CookieModule, CookieOptions, CookieService } from 'ngx-cookie';
import { Router } from '@angular/router';
import { SignalService } from '../../../shared/service/signal.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,FormsModule,CookieModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
    //model:LoginRequest;
    //login$?:Observable<LoginResponse>;
    options:CookieOptions | undefined;
    constructor(private authService:AuthService,public cookieservice:CookieService,private router:Router,private signalService:SignalService) {
      // this.model={
      //   email:'',
      //   password:''
      // }
      // this.options={
      //   path:'/',
      //   expires:undefined,
      //   domain:undefined,
      //   secure:true,
      //   sameSite:'strict'
      // }

      
    }
  ngOnInit(): void {
    //console.log(this.signalService.LoginStatus())
  }

  googleSignIn() {
    this.authService.googleSignIn();
  }

    saveTokenCookie(token :string):void{

    }

    // onLoginSubmit():void {
    //   this.authService.login(this.model).subscribe({
    //     next:(value) =>{
    //       this.cookieservice.put('Authorization',`Bearer ${value.token}`,this.options);
    //       this.signalService.Login(true);
    //       this.authService.setUser(value.email,value.roles);
    //       this.router.navigateByUrl('/');
          
    //     },
    //   });
    //   }

    
}
