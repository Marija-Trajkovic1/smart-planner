export function isSameDate(date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

export function getInitialCalendarDate(): Date {
  const savedDate = sessionStorage.getItem('calendarDate');

  if (savedDate) {
    return new Date(savedDate);
  }

  return new Date();
}

export function saveCalendarDate(date: Date): void {
  sessionStorage.setItem(
    'calendarDate',
    date.toISOString()
  );
}