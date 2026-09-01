import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DailyNotesListResponseDto } from '../../dtos/daily-notes-list-response.model';
import { environment } from '../../environments/environments';
import { DailyNoteResponseDto } from '../../dtos/daily-note-response.model';
import { CreateDailyNoteDto } from '../../dtos/create-daily-note.model';
import { DailyNoteForUpdate } from '../../dtos/daily-note-update.model';

@Injectable({
  providedIn: 'root',
})
export class DailyNoteService {
  private http = inject(HttpClient);

  getDailyNoteListForDay(dayId: number): Observable<DailyNotesListResponseDto[]>{
    return this.http.get<DailyNotesListResponseDto[]>(`${environment.getDailyNotesForDayApiUrl}/${dayId}`);
  }

  createNewDailyNote(dailyNoteToCreate: CreateDailyNoteDto, dayId: number): Observable<DailyNotesListResponseDto> {
    return this.http.post<DailyNotesListResponseDto>(`${environment.createNewDailyNoteApiUrl}/${dayId}`, dailyNoteToCreate);
  }

  updateDailyNoteCategory(dailyNoteId: number, categoryId: number): Observable<DailyNotesListResponseDto> {
    return this.http.put<DailyNotesListResponseDto>(`${environment.updateDailyNoteCategoryApiUrl}/${dailyNoteId}/${categoryId}`,
      {}
    );
  } 

  updateNotesPriorities(payload: { id: number, priority: number }[]): Observable<{success: boolean, message: string}> {
    return this.http.put<{success: boolean, message: string}>(`${environment.updateNotesPrioritiesApiUrl}`, payload);
  }

  deleteDailyNote(dailyNoteId: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${environment.deleteDailyNoteApiUrl}/${dailyNoteId}`, 
      {}
    )
  }

  finishDailyNote(dailyNoteId: number): Observable<DailyNotesListResponseDto> {
    return this.http.put<DailyNotesListResponseDto>(`${environment.finishDailyNoteApiUrl}/${dailyNoteId}`, {});
  }

  updateDailyNote(dailyNoteId: number, dailyNoteForUpdate: DailyNoteForUpdate): Observable<DailyNotesListResponseDto>{
    return this.http.put<DailyNotesListResponseDto>(`${environment.updateDailyNoteApiUrl}/${dailyNoteId}`, dailyNoteForUpdate);
  }

}
