import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterLink } from '@angular/router';
import { LOGIN } from '../../core/constants/routes.constants';
import { ACCESS_TOKEN } from '../../core/constants/storage.constants';

@Component({
  selector: 'app-header',
  imports: [
    MatToolbarModule, 
    MatButtonModule, 
    MatIconModule, 
    RouterLink
  ],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  public router = inject(Router);

  isLoggedIn = signal<boolean>(!!sessionStorage.getItem(ACCESS_TOKEN));

  constructor(){
    this.router.events.subscribe(()=>{
      this.isLoggedIn.set(!!sessionStorage.getItem(ACCESS_TOKEN));
    });
  }

  onLogout(){
    sessionStorage.removeItem(ACCESS_TOKEN);
    this.isLoggedIn.set(false);
    this.router.navigate([LOGIN]);
  }

  goToCalendar(): void {
    this.router.navigate(['/main']);
  }
}
