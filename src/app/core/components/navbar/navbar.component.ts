import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { SignalService } from '../../../shared/service/signal.service';
import { CookieService } from 'ngx-cookie';
import { AuthService } from '../../../feature/auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  user:any;

  constructor(public signal:SignalService,private cookieService:CookieService,private router:Router,private auth:AuthService){}
  ngOnInit(): void {
    debugger
    this.user=this.signal.Roles;
  }

  LogOut() {
    debugger
    //this.signal.Login(false);
    this.auth.signOut();
    }
}
