import { addDays, differenceInDays } from 'date-fns';
import { supabase } from '../lib/supabase';
import { EmailService } from './emailService';
import type { SpecialDate, Partner } from '../types';

export class ReminderScheduler {
  private static instance: ReminderScheduler;
  private emailService: EmailService;
  
  private constructor() {
    this.emailService = EmailService.getInstance();
  }

  static getInstance(): ReminderScheduler {
    if (!this.instance) {
      this.instance = new ReminderScheduler();
    }
    return this.instance;
  }

  async scheduleReminders(userId: string, partner: Partner, events: SpecialDate[]) {
    const today = new Date();
    
    for (const event of events) {
      const eventDate = new Date(event.date);
      const daysUntil = differenceInDays(eventDate, today);
      
      // Schedule reminders at different intervals
      const reminderDays = [30, 14, 7, 3, 1];
      
      for (const days of reminderDays) {
        if (daysUntil === days) {
          await this.emailService.sendEventReminder(userId, event, partner);
        }
      }
    }
  }
}