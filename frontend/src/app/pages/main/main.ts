import { Component, inject, signal } from '@angular/core';
import { MatCardTitle } from '@angular/material/card';
import { DayList } from '../../components/day-list/day-list';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DayDialog } from '../../components/day-dialog/day-dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { DayService } from '../../core/services/day/day';
import { DayResponseDto } from '../../core/dtos/day-response.model';
import { CreateDayDto } from '../../core/dtos/create-day.model';
import { formatDateToIsoString, sortDays } from '../../core/utils/date.utils';
import { DaysListResponseDto } from '../../core/dtos/days-list-response.model';

@Component({
  selector: 'app-main',
  imports: [
    MatCardTitle, 
    MatButtonModule,
    MatDialogModule,
    DayList,
    ReactiveFormsModule
  ],
  templateUrl: './main.html',
  styleUrl: './main.scss',
})
export class Main {
  private dialog = inject(MatDialog);
  private dayService = inject(DayService);
  

  days = signal<DaysListResponseDto[]>([]);

  ngOnInit(): void {
    this.dayService.getAllDaysForUser().subscribe({
      next: (response: DaysListResponseDto[]) => {
        console.log('Dani sa beleskama su ucitani', response);
        const sortedDays = sortDays(response);
        this.days.set(sortedDays);
      },
      error: (err) => {
        console.log('Greska pri ucitavanju dana', err);
      }
    })
  }
  
  onAddDay(): void {
    const dialogRef = this.dialog.open(DayDialog);

    dialogRef.afterClosed().subscribe(((result?: Date) => {
       console.log('Šta je tačno dijalog vratio:', result);
       if (result) {
        console.log('Izabrani datum:', result);
        const newDayData: CreateDayDto = {
          date: formatDateToIsoString(result)
        }

        this.dayService.createNewDayForUser(newDayData).subscribe({
          next: (response: DayResponseDto) => {
            console.log('Dan uspešno kreiran: ', response);

            const newDayWithNotes: DaysListResponseDto = {
              id: response.id,
              date: response.date,
              dailyNotes: []
            };
            
            this.days.update(currentDays => {
              const updatedList = [...currentDays, newDayWithNotes];
              return sortDays(updatedList);
            });
          },
          error: (err)=> console.log('Greska:', err)
        });
      }
    }))
  }

  handleDeleteDay(dayId: number): void {
    this.dayService.deleteDayForUser(dayId).subscribe({
        next: () => {
          console.log('Dan uspešno obrisan iz baze.', dayId);
          this.days.update(currentDays => 
            currentDays.filter(day => day.id !== dayId)
          );
        },
        error: (err) => console.log('Greška pri brisanju dana na backendu:', err)
      });
    }
}
