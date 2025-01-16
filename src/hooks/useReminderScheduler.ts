import { useEffect } from 'react';
import { ReminderScheduler } from '../services/reminderScheduler';
import type { User, Partner, SpecialDate } from '../types';

export function useReminderScheduler(
  user: User | null,
  partner: Partner | null,
  events: SpecialDate[]
) {
  useEffect(() => {
    if (user && partner && events.length > 0) {
      const scheduler = ReminderScheduler.getInstance();
      scheduler.scheduleReminders(user.id, partner, events).catch(error => {
        console.error('Failed to schedule reminders:', error);
      });
    }
  }, [user, partner, events]);
}