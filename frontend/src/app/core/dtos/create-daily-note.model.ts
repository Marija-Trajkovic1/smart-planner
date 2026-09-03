export interface CreateDailyNoteDto{
    title: string;
    time?: string;
    location?: string;
    priority?: number;
    isTheMostImportantToday: boolean;
    link?: string;
    categoryId?: number;
    textType?: string;
    textHeight?: number;
}