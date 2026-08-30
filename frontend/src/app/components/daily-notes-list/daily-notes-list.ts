import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DailyNotesListResponseDto } from '../../core/dtos/daily-notes-list-response.model';
import { DailyNoteService } from '../../core/services/daily-note/daily-note-service';
import { DailyNote } from '../daily-note/daily-note';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { DailyNoteDialog } from '../daily-note-dialog/daily-note-dialog/daily-note-dialog';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CreateDailyNoteDto } from '../../core/dtos/create-daily-note.model';
import { DailyNoteResponseDto } from '../../core/dtos/daily-note-response.model';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-daily-notes-list',
  imports: [
    DailyNote,
    MatButtonModule,
    ReactiveFormsModule,
    MatDialogModule,
    DragDropModule
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

  matrix = computed(()=> {
    const notes = this.dailyNotesList();

    const getSortedNotes = (categoryId: number)=>{
      return notes
        .filter(note => note.category.id===categoryId)
        .sort((a,b)=>(a.priority ?? 0)-(b.priority ?? 0));
    }

    return {
      q1: getSortedNotes(1),
      q2: getSortedNotes(2),
      q3: getSortedNotes(3),
      q4: getSortedNotes(4)
    }
  }) 

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

  onDrop(event: CdkDragDrop<DailyNotesListResponseDto[]>, targetCategoryId: number): void {
    if (event.previousContainer === event.container) {
      
      const currentListInQuadrant = [...event.container.data];
      moveItemInArray(currentListInQuadrant, event.previousIndex, event.currentIndex);
      
      const updatedNotes = currentListInQuadrant.map((note, index) => ({
        ...note,
        priority: index + 1
      }));

      this.updatePrioritiesOnBackend(updatedNotes);
    } else {
      
      const movedNote = event.previousContainer.data[event.previousIndex];

      this.dailyNoteService.updateNoteCategory(movedNote.id, targetCategoryId).subscribe({
        next: () => {
          this.dailyNotesList.update(currentList => 
            currentList.map(note => note.id === movedNote.id ? { ...note, categoryId: targetCategoryId } : note)
          );
        },
        error: (err) => console.log('Greška pri promeni kategorije u bazi:', err)
      });
    }
  }

   private updatePrioritiesOnBackend(updatedNotes: DailyNotesListResponseDto[]): void {
    const priorityPayload = updatedNotes.map((note, index) => ({
      id: note.id,
      priority: index + 1 // Prva kartica dobija 1, druga 2, treća 3...
    }));

    this.dailyNoteService.updateNotesPriorities(priorityPayload).subscribe({
      next: () => console.log('Prioriteti uspešno sačuvani na backendu!'),
      error: (err) => console.error('Greška pri čuvanju prioriteta:', err)
    });
  }

  onAddNewDailyNote(): void {
    console.log('Dugme za dodavanje dnevne beleske radi!');
    const dialogRef = this.dialog.open(DailyNoteDialog);

    dialogRef.afterClosed().subscribe(((result?: CreateDailyNoteDto) => {
      console.log('Dijalog za kreiranje dnevne obaveze je vratio: ', result)
      if(result){
        
        const newDailyNote: CreateDailyNoteDto = result;

        this.dailyNoteService.createNewDailyNote(newDailyNote, this.dayId).subscribe({
          next: (response: DailyNotesListResponseDto) => {
            console.log('Kreirana je nova obaveza');
            this.dailyNotesList.update(currentList=> [...currentList, response]);
          },
          error: (err)=> console.log('Greška pri kreiranju nove dnevne obaveze:', err)
        })
      }
    }))


  }
}
