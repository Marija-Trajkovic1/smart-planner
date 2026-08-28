import { DailyNoteResponseDto } from "./daily-note-response.model";

export interface DaysListResponseDto {
    id:number;
    date:string; 
    dailyNotes: DailyNoteResponseDto[];      
}