import { Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-home',
  imports: [MatButtonModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  isLoggedIn = signal<boolean>(false);

  toggleAuth(){
    this.isLoggedIn.update(status=> !status);
  }
  
}
