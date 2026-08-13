import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatLabel, MatFormField, MatHint } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { RegisterDto } from '../../core/dtos/register.dto';
import { Authorization } from '../../core/services/authorization/authorization';

@Component({
  selector: 'app-register',
  imports: [
    ReactiveFormsModule,
    MatCardModule, 
    MatLabel, 
    MatFormField, 
    MatButtonModule, 
    MatInputModule, 
    MatHint, 
    RouterLink
  ],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  private formBuilder = inject(FormBuilder);
  private authorizationService = inject(Authorization);
  
  constructor(public router:Router) {}

  registerForm : FormGroup = this.formBuilder.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['' , [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).+$/)]],
  });

  onRegister(): void{
    if(this.registerForm.valid){
      const registrationData: RegisterDto = this.registerForm.value;
      this.authorizationService.register(registrationData).subscribe({
        next: (response) => {
          console.log('Registration successful:', response);
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.error('Registration failed:', error);
        }
      });
    } else {
      console.error('Form is invalid');
      this.registerForm.markAllAsTouched();
    }
  }
}
