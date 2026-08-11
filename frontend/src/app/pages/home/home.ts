import { Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterLink, MatButtonModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  constructor(public router: Router) {}
}
