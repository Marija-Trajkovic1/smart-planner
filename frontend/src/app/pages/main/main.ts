import { Component, inject, signal } from '@angular/core';
import { MatCardTitle } from '@angular/material/card';
import { DailyNotesLists } from '../../components/daily-notes-lists/daily-notes-lists';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DailyNoteDialog } from '../../components/daily-note-dialog/daily-note-dialog';
import { DailyNote } from '../../core/models/daily-note.model';

@Component({
  selector: 'app-main',
  imports: [
    MatCardTitle, 
    MatButtonModule,
    MatDialogModule,
    DailyNotesLists,
  ],
  templateUrl: './main.html',
  styleUrl: './main.scss',
})
export class Main {
  private dialog = inject(MatDialog);

  dailyNotes = signal<DailyNote[]>([]);
  
  onAddPlan(): void{
    const dialogRef = this.dialog.open(DailyNoteDialog);

    dialogRef.afterClosed().subscribe(((result?: { date: Date })=>{
       if (result) {
        console.log('Izabrani datum:', result);

      }
    }))
  }

}
