import { Component, inject, signal } from '@angular/core';
import { MatCardTitle } from '@angular/material/card';
import { DailyNotesLists } from '../../components/daily-notes-lists/daily-notes-lists';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DailyNoteDialog } from '../../components/daily-note-dialog/daily-note-dialog';
import { DailyNote } from '../../core/models/daily-note.model';
import { ReactiveFormsModule } from '@angular/forms';
import { Day } from '../../core/services/day/day';
import { DayResponseDto } from '../../core/dtos/day-response.model';
import { CreateDayDto } from '../../core/dtos/create-day.model';
import { formatDateToIsoString } from '../../core/utils/date.utils';

@Component({
  selector: 'app-main',
  imports: [
    MatCardTitle, 
    MatButtonModule,
    MatDialogModule,
    DailyNotesLists,
    ReactiveFormsModule
  ],
  templateUrl: './main.html',
  styleUrl: './main.scss',
})
export class Main {
  private dialog = inject(MatDialog);
  private dayService = inject(Day);

  dailyNotes = signal<DayResponseDto[]>([]);
  
  onAddDay(): void {
    const dialogRef = this.dialog.open(DailyNoteDialog);

    dialogRef.afterClosed().subscribe(((result?: Date )=>{
       console.log('Šta je tačno dijalog vratio:', result);
       if (result) {
        console.log('Izabrani datum:', result);
        const newDayData: CreateDayDto = {
          date: formatDateToIsoString(result)
        }

        this.dayService.createNewDayForUser(newDayData).subscribe({
          next: (response: DayResponseDto) => {
            console.log('Dan uspešno kreiran: ', response);
            this.dailyNotes.update(currentDays=> [
              ...currentDays, 
              response
            ]);
          },
          error: (err)=> console.log('Greska:', err)
        });
      }
    }))
  }

}
