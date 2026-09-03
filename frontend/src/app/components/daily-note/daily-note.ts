import { Component, computed, input, output } from '@angular/core';
import { DailyNotesListResponseDto } from '../../core/dtos/daily-notes-list-response.model';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NgStyle } from '@angular/common';
import { getFontFamily } from '../../core/utils/font.utils';

@Component({
  selector: 'app-daily-note',
  imports: [
    MatIcon,
    MatButtonModule,
    NgStyle
  ],
  templateUrl: './daily-note.html',
  styleUrl: './daily-note.scss',
})
export class DailyNote {
  dailyNote = input.required<DailyNotesListResponseDto>();

  deleteNote = output<number>();
  toggleDone = output<{ id: number; isDone: boolean }>();
  editNote = output<DailyNotesListResponseDto>();

  dynamicStyles = computed(() => {
    const note = this.dailyNote();
    return {
      'font-family': getFontFamily(note.textType),
      'font-size': note.textHeight ? `${note.textHeight}px` : '16px' 
    };
  });

  onDelete(id: number): void {
    this.deleteNote.emit(id);
  }

  onEdit(note: DailyNotesListResponseDto): void {
    this.editNote.emit(note); 
  }

  onToggleDone(event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    this.toggleDone.emit({
      id: this.dailyNote().id, 
      isDone: checkbox.checked
    });
  }
}
