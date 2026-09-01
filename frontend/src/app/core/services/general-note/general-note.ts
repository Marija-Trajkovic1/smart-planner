import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { GeneralNotesResponseDto } from '../../dtos/general-notes-response.dto';
import { Observable } from 'rxjs';
import { CreateGeneralNoteDto } from '../../dtos/create-general-note.dto';

@Injectable({
  providedIn: 'root',
})
export class GeneralNote {
  private http = inject(HttpClient);

  getGeneralNotesList(): Observable<GeneralNotesResponseDto[]>{
    return this.http.get<GeneralNotesResponseDto[]>(`${environment.getListOfGeneralNotesForUserApiUrl}`);
  }

  createNewGeneralNote(newGeneralNote: CreateGeneralNoteDto, dayId: number): Observable<GeneralNotesResponseDto>{
    return this.http.post<GeneralNotesResponseDto>(`${environment.createGeneralNoteApiUrl}/${dayId}`, newGeneralNote);
  }

}
