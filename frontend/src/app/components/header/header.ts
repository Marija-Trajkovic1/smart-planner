import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  public router = inject(Router);

  isLoggedIn = signal<boolean>(!!sessionStorage.getItem('access_token'));

  constructor(){
    this.router.events.subscribe(()=>{
      this.isLoggedIn.set(!!sessionStorage.getItem('access_token'));
    });
  }

  onLogout(){
    sessionStorage.removeItem('access_token');
    this.isLoggedIn.set(false);
    this.router.navigate(['/login']);
  }
}
