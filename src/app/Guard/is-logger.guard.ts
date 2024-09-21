import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { AuthService } from '../Services/auth.service';
import { map, Observable } from 'rxjs';

export const isLoggerGuard: CanActivateFn = (route, state):Observable<boolean | UrlTree > => {
  const authService = inject(AuthService);
  const redirect = inject(Router);
  return authService.isAuthenticated().pipe(map((isAuth)=> isAuth || redirect.createUrlTree(['login'])))
};
