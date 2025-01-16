import { addMonths, isWithinInterval, differenceInDays } from 'date-fns';

function getNextOccurrence(dateStr: string): Date {
  const today = new Date();
  const date = new Date(dateStr);
  
  date.setFullYear(today.getFullYear());
  if (date < today) {
    date.setFullYear(today.getFullYear() + 1);
  }
  
  return date;
}

export function getUpcomingEvents(events: Array<{ date: string; occasion: string }>) {
  const today = new Date();
  const twoMonthsFromNow = addMonths(today, 2);

  return events
    .map(event => ({
      ...event,
      nextDate: getNextOccurrence(event.date)
    }))
    .filter(event => 
      isWithinInterval(event.nextDate, {
        start: today,
        end: twoMonthsFromNow
      })
    )
    .sort((a, b) => a.nextDate.getTime() - b.nextDate.getTime());
}

export function getDaysUntilEvent(dateStr: string): number {
  const nextOccurrence = getNextOccurrence(dateStr);
  return differenceInDays(nextOccurrence, new Date());
}