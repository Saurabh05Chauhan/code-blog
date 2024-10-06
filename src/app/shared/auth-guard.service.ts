import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';
import { SignalService } from './service/signal.service';
import { Auth } from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate  {

  constructor(private signalService:SignalService,private router:Router,private auth: Auth ) { }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> {
    return new Promise((resolve) => {
      debugger
      this.auth.onAuthStateChanged(user => {
        if (user) {
          resolve(true);
        } else {
          this.router.navigate(['/login']);
          resolve(false);
        }
      });
    });
  }
}
