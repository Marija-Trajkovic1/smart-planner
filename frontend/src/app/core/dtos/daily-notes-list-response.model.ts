import { CategoryResponseDto } from "./category-response.model";

export interface DailyNotesListResponseDto {
    id: number;
    title:string;
    time: string;
    location:string;
    priority: number;
    isTheMostImportantToday: boolean;
    link: string;
    isDone: boolean;
    textType: string;
    textHeight: number;

    category: CategoryResponseDto;
}   