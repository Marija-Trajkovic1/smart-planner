import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatLabel, MatFormField, MatHint } from '@angular/material/form-field';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [MatCardModule, MatLabel, MatFormField, MatHint, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  constructor(public router:Router) {}
}
