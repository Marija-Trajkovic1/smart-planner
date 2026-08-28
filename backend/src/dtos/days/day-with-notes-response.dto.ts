import { Type } from "class-transformer";
import { DailyNotesForDaysList } from "./daily-notes-days-response.dto";

export class DayWithDailyNotesResponseDto{
    id:number;
    date:string;
    @Type(()=>DailyNotesForDaysList)
    dailyNotes: DailyNotesForDaysList[];
}