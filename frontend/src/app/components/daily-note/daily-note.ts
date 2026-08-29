import { Component, input } from '@angular/core';
import { DailyNoteResponseDto } from '../../core/dtos/daily-note-response.model';

@Component({
  selector: 'app-daily-note',
  imports: [
    
  ],
  templateUrl: './daily-note.html',
  styleUrl: './daily-note.scss',
})
export class DailyNote {
  dailyNote = input<DailyNoteResponseDto>();
}
