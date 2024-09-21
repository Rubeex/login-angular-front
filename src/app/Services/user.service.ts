import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RespondeProfile } from '../../Interfaces/ResponseProfile';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  private url:string = 'http://192.168.1.13:3000';

  getProfile():Observable<RespondeProfile>{
    return this.httpClient.get<RespondeProfile>(`${this.url}/user/profile`)
  }

}
