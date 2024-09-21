import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../Services/auth.service';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const token = inject(AuthService);
  const authRequest = req.clone(
    {
      setHeaders:{
        Authorization: `Bearer ${token.getToken()}`
      }
    }
  )
  return next(authRequest);
};
