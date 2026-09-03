import { Component, input, output } from '@angular/core';
import { GeneralNotesResponseDto } from '../../core/dtos/general-notes-response.dto';
import { MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-general-note',
  imports: [
    MatLabel,
    MatIcon,
    MatButtonModule,
  ],
  templateUrl: './general-note.html',
  styleUrl: './general-note.scss',
})
export class GeneralNote {
  generalNote = input.required<GeneralNotesResponseDto>();

  deleteNote = output<number>();
  toggleDone = output<{ id: number; isDone: boolean }>();
  editGeneralNote = output<GeneralNotesResponseDto>();

  onEdit(generalNote: GeneralNotesResponseDto): void {
    this.editGeneralNote.emit(generalNote);
  }

  onDelete(id: number): void {
    this.deleteNote.emit(id);
  }

  onSolveNote(event: Event): void{
    const checkbox = event.target as HTMLInputElement;
    this.toggleDone.emit({
      id: this.generalNote().id,
      isDone: checkbox.checked
    })
  }
}
