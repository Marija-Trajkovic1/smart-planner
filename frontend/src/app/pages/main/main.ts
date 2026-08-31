import { Component, inject, signal, OnInit, computed } from '@angular/core';
import { Router } from '@angular/router';
import { MatCardTitle } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule, DatePipe } from '@angular/common';

import { DayService } from '../../core/services/day/day';
import { DaysListResponseDto } from '../../core/dtos/days-list-response.model';
import { DayResponseDto } from '../../core/dtos/day-response.model';
import { CreateDayDto } from '../../core/dtos/create-day.model';
import { formatDateToIsoString, sortDays } from '../../core/utils/date.utils';
import { CalendarCell } from '../../core/interfaces/calendarcell';
import { getInitialCalendarDate, saveCalendarDate } from '../../core/utils/calendar.util';

@Component({
  selector: 'app-main',
  imports: [
    CommonModule,
    MatCardTitle,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    DatePipe
  ],
  templateUrl: './main.html',
  styleUrl: './main.scss',
})
export class Main implements OnInit {
  private dayService = inject(DayService);
  private router = inject(Router);

  days = signal<DaysListResponseDto[]>([]);
  currentDate = signal<Date>(getInitialCalendarDate());

  weekDays = ['Pon', 'Uto', 'Sre', 'Čet', 'Pet', 'Sub', 'Ned'];

  calendarGrid = computed<CalendarCell[]>(() => {
    const date = this.currentDate();
    const year = date.getFullYear();
    const month = date.getMonth();
    const today = new Date();

    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);

    const totalDays = lastDayOfMonth.getDate();

    let startDayOfWeek = firstDayOfMonth.getDay() - 1;

    if (startDayOfWeek === -1) {
      startDayOfWeek = 6;
    }

    const cells: CalendarCell[] = [];

    for (let i = 0; i < startDayOfWeek; i++) {
      cells.push({
        date: null,
        dayNumber: '',
        hasPlan: false,
        planId: null,
        notesCount: 0,
        isToday: false
      });
    }

    for (let dayNum = 1; dayNum <= totalDays; dayNum++) {
      const currentCellDate = new Date(year, month, dayNum);

      const foundPlan = this.days().find(d => {
        const dbDate = new Date(d.date)

        const isUtc =
          typeof d.date === 'string' &&
          d.date.includes('T');

        const dbYear = isUtc
          ? dbDate.getUTCFullYear()
          : dbDate.getFullYear();

        const dbMonth = isUtc
          ? dbDate.getUTCMonth()
          : dbDate.getMonth();

        const dbDay = isUtc
          ? dbDate.getUTCDate()
          : dbDate.getDate();

        return (
          dbDay === dayNum &&
          dbMonth === month &&
          dbYear === year
        );
      });

      const isToday =
        currentCellDate.getFullYear() === today.getFullYear() &&
        currentCellDate.getMonth() === today.getMonth() &&
        currentCellDate.getDate() === today.getDate();

      cells.push({
        date: currentCellDate,
        dayNumber: dayNum,

        hasPlan: !!foundPlan,

        planId: foundPlan ? foundPlan.id : null,

        notesCount: foundPlan?.dailyNotes?.length || 0,

        isToday
      });
    }
    return cells;
  });

  ngOnInit(): void {
    saveCalendarDate(this.currentDate());
    this.loadDays();
  }

  loadDays(): void {
    this.dayService.getAllDaysForUser().subscribe({
      next: (response: DaysListResponseDto[]) => {
        console.log('Dani učitani:', response);
        this.days.set(sortDays(response));
      },
      error: (err) => {
        console.log('Greška pri učitavanju:', err);
      }
    });
  }

  onCellClick(cell: CalendarCell): void {
    if (!cell.date) {
      return;
    }

    if (cell.hasPlan && cell.planId) {
      this.router.navigate(['/day', cell.planId]);
    } else {
      console.log(
        'Automatski kreiram dan za datum:',
        cell.date
      );
      this.onAddDayDirectly(cell.date);
    }
  }

  changeMonth(direction: number): void {
    this.currentDate.update(date => {
    const newDate = new Date(
      date.getFullYear(),
      date.getMonth() + direction,
      1
    )
    saveCalendarDate(newDate);
    return newDate;
  });
  }

  private onAddDayDirectly(targetDate: Date): void {
    const newDayData: CreateDayDto = {
      date: formatDateToIsoString(targetDate)
    };

    this.dayService.createNewDayForUser(newDayData).subscribe({
      next: (response: DayResponseDto) => {
        console.log(
          'Dan uspešno kreiran na klik datuma:',
          response
        );

        const newDayWithNotes: DaysListResponseDto = {
          id: response.id,
          date: response.date,
          dailyNotes: []
        };

        this.days.update(currentDays =>
          sortDays([
            ...currentDays,
            newDayWithNotes
          ])
        );

        this.router.navigate([
          '/day',
          response.id
        ]);
      },

      error: (err) => {
        console.log(
          'Greška pri automatskom kreiranju dana:',
          err
        );
      }
    });
  }
}