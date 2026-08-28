import { DaysListResponseDto } from "../dtos/days-list-response.model";

export function formatDateToIsoString(date: Date | string): string {
  if (!date) return '';
  
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  
  return `${year}-${month}-${day}`;
}

export function sortDays(days: DaysListResponseDto[]): DaysListResponseDto[] {
  return [...days].sort((a, b) => {
    return a.date.localeCompare(b.date);
  });
}