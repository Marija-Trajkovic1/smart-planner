import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardHeader, MatCardContent, MatCardTitle, MatCardModule } from "@angular/material/card";
import { MatFormField, MatHint, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-login',
  imports: [
    MatCardModule, 
    MatCardHeader, 
    MatCardContent,
    MatLabel,
    MatFormField,
    MatHint,
    ReactiveFormsModule,
    MatCardTitle,
    MatInputModule,
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private formBuilder = inject(FormBuilder);
  constructor(){}

  loginForm: FormGroup = this.formBuilder.group({
    email: ['', 
      [Validators.required, 
        Validators.email]
      ],
    password: ['' , 
      [Validators.required, 
        Validators.minLength(8), 
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).+$/)]
      ],
  })

  onLogin():void{}
}
