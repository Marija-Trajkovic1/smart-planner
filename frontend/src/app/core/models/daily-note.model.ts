export interface DailyNote{
    id: number;
    title: string;
    time: string;
    location: string;
    priority: number;
    reminder: boolean;
    link: string;
    isDone: boolean;
}