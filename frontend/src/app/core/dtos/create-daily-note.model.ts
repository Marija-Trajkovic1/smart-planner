export interface CreateDailyNoteDto{
    title: string;
    time?: string;
    location?: string;
    priority?: number;
    isTheMostImportantToday: boolean;
    reminder?: boolean;
    link?: string;
    categoryId?: number;
    textType?: string;
    textHeight?: number;
}