import { Component, signal } from '@angular/core';
import { MatCardTitle } from '@angular/material/card';
import { DailyNotesLists } from '../../components/daily-notes-lists/daily-notes-lists';
import { MatIcon } from '@angular/material/icon';
import { MatButton, MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-main',
  imports: [
    MatCardTitle, 
    MatIcon,
    MatButtonModule,
    DailyNotesLists,
  ],
  templateUrl: './main.html',
  styleUrl: './main.scss',
})
export class Main {
  dailyNotes = signal<any>([]);
  
  onAddPlan(){}
}
