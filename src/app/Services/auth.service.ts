import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { Login } from '../../Interfaces/Login';
import { RespondeAccess } from '../../Interfaces/ResponseAcces';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { DecodeToken } from '../../Interfaces/DecodeToken';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient:HttpClient ,
    private router:Router
  ) {}

  private url:string = 'http://192.168.1.13:3000';

  login(creenditals:Login):Observable<RespondeAccess>{
    return this.httpClient.post<RespondeAccess>(`${this.url}/auth/login`,creenditals)
    .pipe(
      tap(response => {
        if(response && response.access_token){
           this.saveToken(response.access_token)
        }
      })
    )

  }


  redirectWelcome():void{
    this.router.navigate(['/welcome'])
  }
  
  saveToken(token:string):void{
   localStorage.setItem('token',token);
  }

  getToken(){
    return localStorage.getItem('token');
  }

  isAuthenticated():Observable<boolean>{
    const token = this.getToken();
    if(!token){
      return of (false);
    }
    return of (true);
  }



  decodeToken(): Observable<DecodeToken | null>{
    const token = this.getToken();
    if(!token){
      return of(null)
    }

    try {
      const decodedToken = jwtDecode<DecodeToken>(token);
      return of (decodedToken || null)
    } catch (error) {
      return of(null);
    }

  }

}
