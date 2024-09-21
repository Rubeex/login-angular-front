import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';
import { map, tap } from 'rxjs';

export const hasRoleGuard: CanMatchFn = (route, segments) => {
 const authService = inject(AuthService);
 const router = inject(Router);
 const allowedRoles = route.data?.['allowedRoles'];
 return authService.decodeToken().pipe(map((user)=> Boolean(user && allowedRoles.includes(user.rol))),
tap((hasRole)=>{
  if(!hasRole){
    router.navigate(['/welcome'])
  }
}))
};


