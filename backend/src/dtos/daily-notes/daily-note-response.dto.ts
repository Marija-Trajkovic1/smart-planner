import { Type } from "class-transformer";

export class DailyNoteResponseDto{
    id: number;
    title:string;
    time: string;
    location:string;
    priority: string;
    reminder: boolean;
    link: string;
    isDone: boolean;

    @Type(()=> String)
    categoryName?: string;
}