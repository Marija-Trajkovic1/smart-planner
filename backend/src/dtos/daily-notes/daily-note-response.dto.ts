import { Type } from "class-transformer";
import { CategoryResponseDto } from "../category/category-response.dto";

export class DailyNoteResponseDto{
    id: number;
    title:string;
    time: string;
    location:string;
    priority: number;
    link: string;
    isDone: boolean;
    textType: string;
    textHeight: number;

    @Type(() => CategoryResponseDto)
    category?: CategoryResponseDto;
}