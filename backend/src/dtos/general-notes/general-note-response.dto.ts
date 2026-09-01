import { Type } from "class-transformer";
import { CategoryResponseDto } from "../category/category-response.dto";

export class GeneralNoteResponseDto{
    id: number;
    title: string;
    priority?: number;
    isDone?: boolean;
}