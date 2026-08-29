import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DailyNotesListResponseDto } from '../../core/dtos/daily-notes-list-response.model';
import { DailyNoteService } from '../../core/services/daily-note/daily-note-service';
import { DailyNote } from '../daily-note/daily-note';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { DailyNoteDialog } from '../daily-note-dialog/daily-note-dialog/daily-note-dialog';
import { MatDialog } from '@angular/material/dialog';
import { CreateDailyNoteDto } from '../../core/dtos/create-daily-note.model';

@Component({
  selector: 'app-daily-notes-list',
  imports: [
    DailyNote,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './daily-notes-list.html',
  styleUrl: './daily-notes-list.scss',
})
export class DailyNotesList {
  private route = inject(ActivatedRoute);
  private dialog = inject(MatDialog);
  private dailyNoteService = inject(DailyNoteService);
  dailyNotesList = signal<DailyNotesListResponseDto[]>([]);

  dayId!: number;

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('dayId');
    if(idParam) {
      this.dayId = +idParam;
      this.dailyNoteService.getDailyNoteListForDay(this.dayId).subscribe({
         next: (response: DailyNotesListResponseDto[]) => {
          console.log('Obaveze uspešno učitane za izabrani dan:', response);
          this.dailyNotesList.set(response);
        },
        error: (err) => {
          console.error('Greška pri učitavanju obaveza:', err);
        }
      })
    } 
  }

  onAddNewDailyNote(): void {
    console.log('Dugme za dodavanje dnevne beleske radi!');
    const dialogRef = this.dialog.open(DailyNoteDialog);

    dialogRef.afterClosed().subscribe(((result?: CreateDailyNoteDto) => {
      console.log('Dijalog za kreiranje dnevne obaveze je vratio: ', result)
      if(result){
        //formirati objekat i proslediti 
      }
    }))


  }
}
