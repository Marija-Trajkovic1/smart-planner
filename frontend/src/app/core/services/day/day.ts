import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environments';

import { CreateDayDto } from '../../dtos/create-day.model';
import { DayResponseDto } from '../../dtos/day-response.model';
import { Observable } from 'rxjs';
import { DaysListResponseDto } from '../../dtos/days-list-response.model';

@Injectable({
  providedIn: 'root',
})
export class DayService {
  private http = inject(HttpClient);
  
  createNewDayForUser(newDayData:CreateDayDto): Observable<DayResponseDto> {
    return this.http.post<DayResponseDto>(`${environment.createNewDayApiUrl}`, newDayData);
  }

  getAllDaysForUser(): Observable<DaysListResponseDto[]> {
    return this.http.get<DaysListResponseDto[]>(`${environment.getDaysListForUserApiUrl}`);
  }

  deleteDayForUser(dayId: number): Observable<{ message: string }>{
    return this.http.delete<{ message: string }>(`${environment.deleteDayApiUrl}/${dayId}`);
  } 
}
