export class CreateDailyNoteDto{
    title: string;
    time?: string;
    location?: string;
    priority?: number;
    link?: string;
    categoryId?: number;
    textType?: string;
    textHeight?: number;
}