import { Component, input } from '@angular/core';
import { DaysListResponseDto } from '../../core/dtos/days-list-response.model';
import { Day } from '../day/day';

@Component({
  selector: 'app-day-list',
  imports: [
    Day
  ],
  templateUrl: './day-list.html',
  styleUrl: './day-list.scss',
})
export class DayList {
  days = input<DaysListResponseDto[]>([]);
}
