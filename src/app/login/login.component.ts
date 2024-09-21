import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Login } from '../../Interfaces/Login';
import { RouterModule } from '@angular/router';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  Login: FormGroup;

  constructor(private fb:FormBuilder, private authService:AuthService){
     this.Login = this.createLoginForm();
  }

  private createLoginForm():FormGroup {
    return this.fb.group({
        email: ['',[Validators.required,Validators.email]],
        password:['',[Validators.required,Validators.minLength(4)]]
    });
  }

  get email(){
    return this.Login.get('email');
  }
  
  get password(){
    return this.Login.get('password');
  }

  onSubmit():void{
    this.Login.markAllAsTouched();
    if(this.Login.invalid){
      return;
    }
    this.loginUser(this.Login.value);
  }

  private loginUser(creenditals:Login):void{
   this.authService.login(creenditals).subscribe({
    next: (response)=>{
       this.authService.redirectWelcome();
    },
    error:(err)=>{
      alert(err.error.message)
    }
   })

  }



}
