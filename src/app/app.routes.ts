import { Routes } from '@angular/router';
import { isLoggerGuard } from './Guard/is-logger.guard';
import { hasRoleGuard } from './Guard/has-role.guard';
import { Roles } from '../Interfaces/Roles';

export const routes: Routes = [
    {
    path: '',
    loadComponent: () => import('./Home/home.component').then((c) => c.HomeComponent)
    }   , 
    {
    path: 'login',
    loadComponent:() => import('./login/login.component').then((c)=> c.LoginComponent)
    },
    {
    path: 'register',
    loadComponent:()=> import('./register/register.component').then((c)=> c.RegisterComponent)
    },
    {
    path: 'welcome',
    canActivate:[isLoggerGuard],
    canMatch:[hasRoleGuard],
    data:{
        allowedRoles:[Roles.user,Roles.admin]
    },
    loadComponent:()=> import('./welcome/welcome.component').then((c)=> c.WelcomeComponent)
    }

];
