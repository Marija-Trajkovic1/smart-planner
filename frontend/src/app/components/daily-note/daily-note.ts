import { Component, input, output } from '@angular/core';
import { DailyNotesListResponseDto } from '../../core/dtos/daily-notes-list-response.model';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-daily-note',
  imports: [
    MatIcon,
  ],
  templateUrl: './daily-note.html',
  styleUrl: './daily-note.scss',
})
export class DailyNote {
  dailyNote = input.required<DailyNotesListResponseDto>();

  deleteNote = output<number>();
  toggleDone = output<{ id: number; isDone: boolean }>();

  onDelete(id: number): void {
    this.deleteNote.emit(id);
  }

  onToggleDone(event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    this.toggleDone.emit({
      id: this.dailyNote().id, 
      isDone: checkbox.checked
    });
  }
}
