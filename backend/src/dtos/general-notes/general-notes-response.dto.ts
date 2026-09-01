import { Type } from "class-transformer";
import { CategoryResponseDto } from "../category/category-response.dto";

export class GeneralNotesResponseDto{
    title: string;
    priority: number;
    isDone: boolean;
}