import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { GeneralNotesResponseDto } from '../../dtos/general-notes-response.dto';
import { Observable } from 'rxjs';
import { CreateGeneralNoteDto } from '../../dtos/create-general-note.dto';
import { UpadteGeneralNoteDto } from '../../dtos/update-general-note.model';
import { CreateDailyNoteDto } from '../../dtos/create-daily-note.model';
import { DailyNotesListResponseDto } from '../../dtos/daily-notes-list-response.model';

@Injectable({
  providedIn: 'root',
})
export class GeneralNoteService {
  private http = inject(HttpClient);

  getGeneralNotesList(): Observable<GeneralNotesResponseDto[]>{
    return this.http.get<GeneralNotesResponseDto[]>(`${environment.getListOfGeneralNotesForUserApiUrl}`);
  }

  createNewGeneralNote(newGeneralNote: CreateGeneralNoteDto): Observable<GeneralNotesResponseDto>{
    return this.http.post<GeneralNotesResponseDto>(`${environment.createGeneralNoteApiUrl}`, newGeneralNote);
  }

  updateDailyNote(generalNoteId: number, updateGeneralNoteDto: UpadteGeneralNoteDto): Observable<GeneralNotesResponseDto>{
    return this.http.put<GeneralNotesResponseDto>(`${environment.updateGeneralNoteApiUrl}/${generalNoteId}`, updateGeneralNoteDto);
  }

  deleteGeneralNote(generalNoteId: number){
    return this.http.delete<{message:string}>(`${environment.deleteGeneralNoteApiUrl}/${generalNoteId}`);
  }

  updatePriorities(updatedList: GeneralNotesResponseDto[]): Observable<void> {
    const payload = updatedList.map(note => ({
      id: note.id,
      priority: note.priority
    }));

    return this.http.put<void>(`${environment.updatePrioritiesForGenrealNoteApiUrl}`, payload);
  }

  solveGeneralNote(createDailyNoteDto: CreateDailyNoteDto,dayId: number, generalNoteId: number): Observable<DailyNotesListResponseDto> {
    return this.http.post<DailyNotesListResponseDto>(`${environment.solveGeneralNoteApiUrl}/${generalNoteId}/${dayId}`, createDailyNoteDto);
  }

}
