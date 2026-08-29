import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DailyNotesListResponseDto } from '../../dtos/daily-notes-list-response.model';
import { environment } from '../../environments/environments';
import { DailyNoteResponseDto } from '../../dtos/daily-note-response.model';
import { CreateDailyNoteDto } from '../../dtos/create-daily-note.model';

@Injectable({
  providedIn: 'root',
})
export class DailyNoteService {
  private http = inject(HttpClient);

  getDailyNoteListForDay(dayId: number): Observable<DailyNotesListResponseDto[]>{
    return this.http.get<DailyNotesListResponseDto[]>(`${environment.getDailyNotesForDayApiUrl}/${dayId}`);
  }

  createNewDailyNote(dailyNoteToCreate: CreateDailyNoteDto, dayId: number): Observable<DailyNoteResponseDto> {
    return this.http.post<DailyNoteResponseDto>(`${environment.createNewDailyNoteApiUrl}/${dayId}`, dailyNoteToCreate);
  }

}
