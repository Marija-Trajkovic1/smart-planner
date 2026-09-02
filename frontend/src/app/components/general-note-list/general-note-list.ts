import { Component, inject, signal } from '@angular/core';
import { GeneralNotesResponseDto } from '../../core/dtos/general-notes-response.dto';
import { GeneralNoteService } from '../../core/services/general-note/general-note';
import { GeneralNote } from '../general-note/general-note';
import { CreateGeneralNoteDialog } from '../create-general-note-dialog/create-general-note-dialog';
import { CreateGeneralNoteDto } from '../../core/dtos/create-general-note.dto';
import { MatDialog } from '@angular/material/dialog';
import { UpdateGeneralNoteDialog } from '../update-general-note-dialog/update-general-note-dialog';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-general-note-list',
  imports: [
    GeneralNote,
    DragDropModule,
  ],
  templateUrl: './general-note-list.html',
  styleUrl: './general-note-list.scss',
})
export class GeneralNoteList {
  private generalNoteService = inject(GeneralNoteService);
  private dialog = inject(MatDialog);
  generalNotesList = signal<GeneralNotesResponseDto[]>([]);

  ngOnInit(): void {
    this.loadGeneralNotes();
  }

  loadGeneralNotes(): void {
    this.generalNoteService.getGeneralNotesList().subscribe({
      next: (response: GeneralNotesResponseDto[]) => {
        console.log('Lista generalnih obaveza: ', response);
        const sortedList = response.sort((a,b) => a.priority-b.priority);
        this.generalNotesList.set(sortedList);
      },
      error: (err)=> console.error('Greska pri ucitavanju generalnih obaveza')
    });
  }

  private reorderAndSavePriorities(currentList: GeneralNotesResponseDto[]): void {
    const updatedList = currentList.map((note, index) => ({
      ...note,
      priority: index + 1
    }));

    this.generalNotesList.set(updatedList);

    this.generalNoteService.updatePriorities(updatedList).subscribe({
      next: () => console.log('Prioriteti uspešno sinhronizovani na bekendu'),
      error: (err) => {
        console.error('Greška pri sinhronizaciji prioriteta:', err);
        this.loadGeneralNotes();
      }
    });
  }

  onDrop(event: CdkDragDrop<GeneralNotesResponseDto[]>): void {
    const list = [...this.generalNotesList()];
    moveItemInArray(list, event.previousIndex, event.currentIndex);
    this.reorderAndSavePriorities(list);
  }

  onAddNewGeneralNote(): void {
    const dialogRef = this.dialog.open(CreateGeneralNoteDialog);

    dialogRef.afterClosed().subscribe(((result?: CreateGeneralNoteDto)=>{
      if(result){
        this.generalNoteService.createNewGeneralNote(result).subscribe({
          next: (newNote) => {
            console.log('Kreirana dnevna obaveza');
            const updatedList = [...this.generalNotesList(), newNote];
            this.reorderAndSavePriorities(updatedList);
          }, 
          error: (err) => console.log('Greska pri kreiranju generalne obaveze', err)
        })
      }
    }))
  }

  onDeleteGeneralNote(id:number): void {
    console.log('Kliknuta kantica, ID:', id);
    if (!confirm('Da li ste sigurni da želite da obrišete ovu obavezu?')) {
      return;
    }

    this.generalNoteService.deleteGeneralNote(id).subscribe({
      next: () => {
        console.log('Obaveza obrisana');
        const updatedList = this.generalNotesList().filter(note => note.id !== id);
        this.reorderAndSavePriorities(updatedList);
      },
      error: (err) => console.error('Greška pri brisanju:', err)
    });
  }

  onUpdateGeneralNote(generalNote: GeneralNotesResponseDto): void {
    console.log('Otvaram izmenu za obavezu:', generalNote);

    const dialogRef = this.dialog.open(UpdateGeneralNoteDialog, {
      data: { note: generalNote }
    });
    
    dialogRef.afterClosed().subscribe((result) => {
      if(result){
        this.generalNoteService.updateDailyNote(result.id, result).subscribe({
          next: () => {
            console.log('Obaveza uspešno ažurirana na bekendu');
            this.loadGeneralNotes();
          },
          error: (err) => {
            console.error('Greška pri ažuriranju obaveze:', err);
            this.loadGeneralNotes();
          }
        })
      }
    })
  }


}
