
export interface CalendarCell {
  date: Date | null;
  dayNumber: number | string;
  hasPlan: boolean;
  planId: number | null;
  notesCount: number;
  isToday: boolean;
}