import { Type } from "class-transformer";
import { DailyNoteResponseDto } from "./daily-note-response.dto";

export class DayResponseDto{
    id:number;
    date:string;
    @Type(()=>DailyNoteResponseDto)
    notes: DailyNoteResponseDto[];
}