import { Component, inject, signal, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DailyNotesListResponseDto } from '../../core/dtos/daily-notes-list-response.model';
import { DailyNoteService } from '../../core/services/daily-note/daily-note-service';
import { DailyNote } from '../daily-note/daily-note';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { DailyNoteDialog } from '../daily-note-dialog/daily-note-dialog';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CreateDailyNoteDto } from '../../core/dtos/create-daily-note.model';
import { CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { UpdateDailyNoteDialog } from '../update-daily-note-dialog/update-daily-note-dialog';
import { GeneralNoteList } from "../general-note-list/general-note-list";
import { GeneralNoteService } from '../../core/services/general-note/general-note';
import { sortFn } from '../../core/utils/prioritires.utils';
import { DailyNoteResponseDto } from '../../core/dtos/daily-note-response.model';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-daily-notes-list',
  imports: [
    DailyNote,
    MatButtonModule,
    ReactiveFormsModule,
    MatDialogModule,
    DragDropModule,
    GeneralNoteList,
    MatSnackBarModule,
    MatIconModule
],
  templateUrl: './daily-notes-list.html',
  styleUrl: './daily-notes-list.scss',
})
export class DailyNotesList implements OnInit {
  private route = inject(ActivatedRoute);
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar); 
  
  private dailyNoteService = inject(DailyNoteService);
  private generalNoteService = inject(GeneralNoteService);

  @ViewChild(GeneralNoteList) generalNoteListChild!: GeneralNoteList; 

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
        
        this.q1.set(response.filter(n => n.category?.id === 2).sort(sortFn));
        this.q2.set(response.filter(n => n.category?.id === 3).sort(sortFn));
        this.q3.set(response.filter(n => n.category?.id === 4).sort(sortFn));
        this.q4.set(response.filter(n => n.category?.id === 5).sort(sortFn));
      },
      error: (err) => console.error('Greška pri učitavanju obaveza:', err)
    });
  }

  handleGeneralNoteSolved(event: { id: number; isDone: boolean }): void {
    if (!event.isDone) return;
    const dialogRef = this.dialog.open(DailyNoteDialog);

    dialogRef.afterClosed().subscribe(((result?: CreateDailyNoteDto) => {
      if (result) {
        this.generalNoteService.solveGeneralNote(result, this.dayId, event.id).subscribe({
           next: (newDailyNote: DailyNotesListResponseDto) => {
            const targetCategoryId = newDailyNote.category.id;
            let currentQuadrantNotes: DailyNotesListResponseDto[] = [];

            if (targetCategoryId === 2) currentQuadrantNotes = [...this.q1()];
            else if (targetCategoryId === 3) currentQuadrantNotes = [...this.q2()];
            else if (targetCategoryId === 4) currentQuadrantNotes = [...this.q3()];
            else if (targetCategoryId === 5) currentQuadrantNotes = [...this.q4()];

            const combinedList = [...currentQuadrantNotes, newDailyNote].sort(sortFn);

            const updatedNotes = combinedList.map((note, index) => ({
              ...note,
              priority: index + 1
            }));

            this.updateLocalQuadrantSignal(targetCategoryId, updatedNotes);
            this.updatePrioritiesOnBackend(updatedNotes);

            if (this.generalNoteListChild) {
              this.generalNoteListChild.loadGeneralNotes();
            }
          },
          error: (err) => {
            console.error('Greška pri rešavanju:', err);
            if (this.generalNoteListChild) this.generalNoteListChild.loadGeneralNotes();
          }
        });

      } else {
        
      }
    }));
  }

  onDrop(event: CdkDragDrop<DailyNotesListResponseDto[]>, targetCategoryId: number): void {
    console.log('onDrop aktiviran! Ciljna kategorija:', targetCategoryId);

    if (event.previousContainer === event.container) {
      const currentList = [...event.container.data];
      moveItemInArray(currentList, event.previousIndex, event.currentIndex);
      
      const updatedNotes = currentList.map((note, index) => ({
        ...note,
        priority: index + 1
      }));

      this.updateLocalQuadrantSignal(targetCategoryId, updatedNotes);
      this.updatePrioritiesOnBackend(updatedNotes);
    } else {
      const movedNote = event.item.data;

      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      this.dailyNoteService.updateDailyNoteCategory(movedNote.id, targetCategoryId).subscribe({
        next: () => {
          console.log('Kategorija uspešno promenjena u bazi!');

          const targetList = [...event.container.data].map((note, index) => ({
            ...note,
            categoryId: targetCategoryId,
            priority: index + 1
          }));

          this.updateLocalQuadrantSignal(targetCategoryId, targetList);
          
          this.updatePrioritiesOnBackend(targetList);
        },
        error: (err) => {
          console.error('Greška pri prebacivanju, vraćam na staro:', err);
          this.loadData();
        }
      });
    }
  }

  private updateLocalQuadrantSignal(categoryId: number, notes: DailyNotesListResponseDto[]) {
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

  onDeleteDailyNote(id: number): void {
    console.log('Kliknuta kantica, ID:', id);
    if (!confirm('Da li ste sigurni da želite da obrišete ovu obavezu?')) {
      return;
    }

    let targetCategoryId = 0;
    let currentQuadrantNotes: DailyNotesListResponseDto[] = [];

    if (this.q1().some(n => n.id === id)) { targetCategoryId = 2; currentQuadrantNotes = [...this.q1()]; }
    else if (this.q2().some(n => n.id === id)) { targetCategoryId = 3; currentQuadrantNotes = [...this.q2()]; }
    else if (this.q3().some(n => n.id === id)) { targetCategoryId = 4; currentQuadrantNotes = [...this.q3()]; }
    else if (this.q4().some(n => n.id === id)) { targetCategoryId = 5; currentQuadrantNotes = [...this.q4()]; }

    this.dailyNoteService.deleteDailyNote(id).subscribe({
      next: (response) => {
        console.log(response.message);
        const filteredNotes = currentQuadrantNotes.filter(n => n.id !== id);
        const updatedNotes = filteredNotes.map((note, index) => ({
          ...note,
          priority: index + 1
        }));

        this.updateLocalQuadrantSignal(targetCategoryId, updatedNotes);

        if (updatedNotes.length > 0) {
          this.updatePrioritiesOnBackend(updatedNotes);
        }
      },
      error: (err) => {
        console.error('Greška pri brisanju obaveze:', err);
        this.loadData();
      }
    });
  }

  onToggleDailyNoteDone(event: { id: number; isDone: boolean }): void {
    this.dailyNoteService.finishDailyNote(event.id).subscribe({
      next: (updatedNote) => {
        console.log('Obaveza uspešno završena na bekendu');

        const updateStatus = (notes: DailyNotesListResponseDto[]) => 
          notes.map(n => n.id === event.id ? { ...n, isDone: event.isDone } : n);

        this.q1.update(updateStatus);
        this.q2.update(updateStatus);
        this.q3.update(updateStatus);
        this.q4.update(updateStatus);
      },
      error: (err) => {
        console.error('Greška pri završavanju obaveze:', err);
        this.loadData();
      }
    });
  }

  onUpdateDailyNote(note: DailyNotesListResponseDto): void {
    console.log('Otvaram izmenu za obavezu:', note);

    const dialogRef = this.dialog.open(UpdateDailyNoteDialog, {
      data: { note: note }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.dailyNoteService.updateDailyNote(result.id, result).subscribe({
          next: () => {
            console.log('Obaveza uspešno ažurirana na bekendu');

            const updateLocalFields = (notes: DailyNotesListResponseDto[]) =>
              notes.map(n => n.id === result.id ? { ...n, ...result } : n);

            this.q1.update(updateLocalFields);
            this.q2.update(updateLocalFields);
            this.q3.update(updateLocalFields);
            this.q4.update(updateLocalFields);
          },
          error: (err) => {
            console.error('Greška pri ažuriranju obaveze:', err);
            this.loadData();
          }
        });
      }
    });
  }

  checkUpcomingReminders(): void {
  const allNotes = [...this.q1(), ...this.q2(), ...this.q3(), ...this.q4()];

  const sada = new Date();
  const trenutnoVreme = sada.toTimeString().substring(0, 5);

  const predstojeceObaveze = allNotes.filter(note => 
    !note.isDone && 
    note.time && 
    note.time > trenutnoVreme
  );

  if (predstojeceObaveze.length === 0) {
    this.snackBar.open('Nemate preostalih obaveza za danas.', 'Zatvori', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom'
    });
    return;
  }

  predstojeceObaveze.sort((a, b) => (a.time ?? '').localeCompare(b.time ?? ''));

  let poruka = 'Predstojeće obaveze za danas:\n';
  predstojeceObaveze.forEach(note => {
    poruka += `• ${note.title} u ${note.time}h\n`;
  });

  this.snackBar.open(poruka, 'U redu', {
    duration: 6000, 
    horizontalPosition: 'right',
    verticalPosition: 'bottom'
  });
}


}
