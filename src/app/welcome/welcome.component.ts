import { Component } from '@angular/core';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent {

  messages:string = "";

  constructor(private userService: UserService){

    this.userService.getProfile().subscribe({
      next:(response)=>{
        this.messages = response.message;
        console.log(response)
      },
      error:(err)=>{
        alert(err.error.message);
      }
    })
  }



}
