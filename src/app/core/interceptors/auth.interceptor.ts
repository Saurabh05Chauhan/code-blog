import { HTTP_INTERCEPTORS, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { CookieService } from 'ngx-cookie';



export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('userToken');

    if (token) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)
      });
      return next(cloned);
    } else {
      return next(req);
    }
};
