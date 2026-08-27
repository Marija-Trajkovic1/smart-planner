import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environments';

import { CreateDayDto } from '../../dtos/create-day.model';
import { DayResponseDto } from '../../dtos/day-response.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Day {
  private http = inject(HttpClient);
  
  createNewDayForUser(newDayData:CreateDayDto): Observable<DayResponseDto>{
    return this.http.post<DayResponseDto>(`${environment.createNewDayApiUrl}`, newDayData);
  }
}
