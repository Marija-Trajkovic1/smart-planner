import { Component } from '@angular/core';
import { MatCardTitle } from '@angular/material/card';
import { DailyNotesLists } from '../../components/daily-notes-lists/daily-notes-lists';

@Component({
  selector: 'app-main',
  imports: [
    MatCardTitle, 
    DailyNotesLists,
  ],
  templateUrl: './main.html',
  styleUrl: './main.scss',
})
export class Main {}
