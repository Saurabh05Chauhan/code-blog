import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';
import { SignalService } from './service/signal.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate  {

  constructor(private signalService:SignalService,private router:Router) { }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return true;
    // if(this.signalService.LoginStatus()=='true'){
    //   return true;
    // }
    // else{
    //   this.router.navigate(['/login'], {
    //     queryParams: {
    //       returnUrl: state.url
    //     }
    //   });
    //   return false;
    // }
  }
}
