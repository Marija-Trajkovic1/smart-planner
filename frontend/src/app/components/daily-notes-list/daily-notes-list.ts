import { Component, inject, signal, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DailyNotesListResponseDto } from '../../core/dtos/daily-notes-list-response.model';
import { DailyNoteService } from '../../core/services/daily-note/daily-note-service';
import { DailyNote } from '../daily-note/daily-note';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { DailyNoteDialog } from '../daily-note-dialog/daily-note-dialog/daily-note-dialog';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CreateDailyNoteDto } from '../../core/dtos/create-daily-note.model';
import { CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

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
export class DailyNotesList implements OnInit {
  private route = inject(ActivatedRoute);
  private dialog = inject(MatDialog);
  private dailyNoteService = inject(DailyNoteService);

  // Nezavisni signali za svaki kvadrant matrice
  q1 = signal<DailyNotesListResponseDto[]>([]);
  q2 = signal<DailyNotesListResponseDto[]>([]);
  q3 = signal<DailyNotesListResponseDto[]>([]);
  q4 = signal<DailyNotesListResponseDto[]>([]);

  dayId!: number;

  get hasNotes(): boolean {
    return this.q1().length > 0 || this.q2().length > 0 || this.q3().length > 0 || this.q4().length > 0;
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('dayId');
    if(idParam) {
      this.dayId = +idParam;
      this.loadData();
    } 
  }

  loadData(): void {
    this.dailyNoteService.getDailyNoteListForDay(this.dayId).subscribe({
      next: (response: DailyNotesListResponseDto[]) => {
        console.log('Podaci sa bekenda stigli:', response);
        
        const sortFn = (a: any, b: any) => (a.priority ?? 0) - (b.priority ?? 0);
        
        // ISPRAVLJENI ID-JEVI IZ BAZE: 2, 3, 4, 5
        this.q1.set(response.filter(n => n.category?.id === 2).sort(sortFn));
        this.q2.set(response.filter(n => n.category?.id === 3).sort(sortFn));
        this.q3.set(response.filter(n => n.category?.id === 4).sort(sortFn));
        this.q4.set(response.filter(n => n.category?.id === 5).sort(sortFn));
      },
      error: (err) => console.error('Greška pri učitavanju obaveza:', err)
    });
  }

    onDrop(event: CdkDragDrop<DailyNotesListResponseDto[]>, targetCategoryId: number): void {
    console.log('onDrop aktiviran! Ciljna kategorija:', targetCategoryId);

    if (event.previousContainer === event.container) {
      // Slučaj A: Pomeranje unutar istog kvadranta
      const currentList = [...event.container.data];
      moveItemInArray(currentList, event.previousIndex, event.currentIndex);
      
      const updatedNotes = currentList.map((note, index) => ({
        ...note,
        priority: index + 1
      }));

      this.updateLocalQuadrantSignal(targetCategoryId, updatedNotes);
      this.updatePrioritiesOnBackend(updatedNotes);
    } else {
      // Slučaj B: Premeštanje iz jednog kvadranta u drugi
      const movedNote = event.item.data;

      // 1. Vizuelno prebacujemo element preko CDK funkcije
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      // 2. Prvo menjamo kategoriju na backendu
      this.dailyNoteService.updateDailyNoteCategory(movedNote.id, targetCategoryId).subscribe({
        next: () => {
          console.log('Kategorija uspešno promenjena u bazi!');
          
          // 3. Nakon uspešne promene kategorije, ažuriramo i prioritete za ceo ciljni prozor
          const targetList = [...event.container.data].map((note, index) => ({
            ...note,
            categoryId: targetCategoryId,
            priority: index + 1
          }));

          // Osvežavamo lokalni signal za ciljni prozor
          this.updateLocalQuadrantSignal(targetCategoryId, targetList);
          
          // Šaljemo novi redosled prioriteta i za ovaj prozor na backend
          this.updatePrioritiesOnBackend(targetList);
        },
        error: (err) => {
          console.error('Greška pri prebacivanju, vraćam na staro:', err);
          this.loadData(); // Vraćamo u prvobitno stanje ako pukne
        }
      });
    }
  }


  private updateLocalQuadrantSignal(categoryId: number, notes: DailyNotesListResponseDto[]) {
    // Mapiranje lokalnog osvežavanja na ID-jeve 2, 3, 4, 5
    if (categoryId === 2) this.q1.set(notes);
    if (categoryId === 3) this.q2.set(notes);
    if (categoryId === 4) this.q3.set(notes);
    if (categoryId === 5) this.q4.set(notes);
  }

  private updatePrioritiesOnBackend(updatedNotes: DailyNotesListResponseDto[]): void {
    const priorityPayload = updatedNotes.map((note, index) => ({
      id: note.id,
      priority: index + 1
    }));

    this.dailyNoteService.updateNotesPriorities(priorityPayload).subscribe({
      next: () => console.log('Prioriteti sačuvani!'),
      error: (err) => console.error('Greška pri čuvanju prioriteta:', err)
    });
  }

  onAddNewDailyNote(): void {
    const dialogRef = this.dialog.open(DailyNoteDialog);

    dialogRef.afterClosed().subscribe(((result?: CreateDailyNoteDto) => {
      if(result){
        this.dailyNoteService.createNewDailyNote(result, this.dayId).subscribe({
          next: () => {
            console.log('Kreirana obaveza');
            this.loadData();
          },
          error: (err) => console.log('Greška pri kreiranju:', err)
        });
      }
    }));
  }
}
