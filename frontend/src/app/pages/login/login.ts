import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardHeader, MatCardContent, MatCardTitle, MatCardModule } from "@angular/material/card";
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Authorization } from '../../core/services/authorization/authorization';
import { Router } from '@angular/router';
import { ACCESS_TOKEN } from '../../core/constants/storage.constants';
import { MAIN } from '../../core/constants/routes.constants';

@Component({
  selector: 'app-login',
  imports: [
    MatCardModule, 
    MatCardHeader, 
    MatCardContent,
    MatLabel,
    MatFormField,
    ReactiveFormsModule,
    MatCardTitle,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private formBuilder = inject(FormBuilder);
  private authorizationService = inject(Authorization);
  private router = inject(Router);
  isLoginSucces = true;

  loginForm: FormGroup = this.formBuilder.group({
    email: ['', 
      [
        Validators.required, 
        Validators.email
      ]],
    password: ['' , 
      [
        Validators.required, 
        Validators.minLength(8), 
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).+$/)
      ]],
  })

  onLogin():void {
    if(this.loginForm.valid) {
      const loginData = this.loginForm.value;

      this.authorizationService.login(loginData).subscribe({
        next:(response)=>{
          console.log('Prijava uspešna!', response);
          this.isLoginSucces = true;
          sessionStorage.setItem(ACCESS_TOKEN, response.access_token);
          this.router.navigate([MAIN]);
        },
        error:(error)=> {
          this.isLoginSucces = false;
          console.error('Prijava nije uspela: ', error);
        }
      });
    } else {
      console.error('Unesite ispravne podatke za prijavu!');
      this.isLoginSucces = false;
      this.loginForm.markAllAsTouched(); 
    }
  }
}
