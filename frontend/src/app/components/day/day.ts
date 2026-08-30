import { Component, inject, input, output } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { DayResponseDto } from '../../core/dtos/day-response.model';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-day',
  imports: [
    MatButton,
    DatePipe,
  ],
  templateUrl: './day.html',
  styleUrl: './day.scss',
})
export class Day {
  router = inject(Router);
  day = input.required<DayResponseDto>();
  deleteDayEvent = output<number>();

  onViewDay(): void{ 
    console.log('Kliknuto na pregled dana sa ID-em:', this.day().id);
    this.router.navigate(['/day', this.day().id]);
  }

  onDeleteDay(): void {
     console.log('Dan za brisanje sa ID-em:', this.day().id);
     this.deleteDayEvent.emit(this.day().id)
  }

}
