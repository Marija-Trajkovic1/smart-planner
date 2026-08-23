import { Type } from "class-transformer";
import { DailyNotesForDaysList } from "./daily-notes-days-response.dto";

export class DayResponseDto{
    id:number;
    date:string;
    @Type(()=>DailyNotesForDaysList)
    notes: DailyNotesForDaysList[];
}