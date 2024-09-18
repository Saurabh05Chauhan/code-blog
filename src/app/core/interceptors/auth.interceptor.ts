import { HTTP_INTERCEPTORS, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { CookieService } from 'ngx-cookie';



export const authInterceptor: HttpInterceptorFn = (req, next) => {
  

  if(req.method==='POST' || req.method==='PUT'|| req.method==='DELETE'){
    const cookieService = inject(CookieService);
    
    //Clone the request and add the authorization header
      const authReq = req.clone({
      setHeaders: {
        Authorization: `${cookieService.get('Authorization')}`
      }
    });
  return next(authReq);

  }
  else{
    return next(req);

  }
  

  // Pass the cloned request with the updated header to the next handler
};
