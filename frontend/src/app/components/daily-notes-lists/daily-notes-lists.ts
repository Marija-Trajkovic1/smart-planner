import { Component, input } from '@angular/core';
import { DayResponseDto } from '../../core/dtos/day-response.model';

@Component({
  selector: 'app-daily-notes-lists',
  imports: [],
  templateUrl: './daily-notes-lists.html',
  styleUrl: './daily-notes-lists.scss',
})
export class DailyNotesLists {
  days = input<DayResponseDto[]>([]);
}
