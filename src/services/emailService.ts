import { supabase } from '../lib/supabase';
import { RecommendationEngine } from './recommendationEngine';
import { getUpcomingEvents } from '../utils/dateUtils';
import type { Partner, SpecialDate } from '../types';

interface EmailContent {
  subject: string;
  body: string;
}

export class EmailService {
  private static instance: EmailService;
  
  private constructor() {}

  static getInstance(): EmailService {
    if (!this.instance) {
      this.instance = new EmailService();
    }
    return this.instance;
  }

  async sendEventReminder(userId: string, event: SpecialDate, partner: Partner) {
    try {
      // Get gift recommendations
      const engine = RecommendationEngine.getInstance();
      const recommendations = await engine.getRecommendations({
        partner,
        upcomingEvents: true,
        priceRange: { min: 20, max: 500 }
      });

      const emailContent = this.generateReminderEmail(event, recommendations);
      
      // Send email through Supabase Edge Function
      const { error } = await supabase.functions.invoke('send-email', {
        body: {
          userId,
          subject: emailContent.subject,
          content: emailContent.body
        }
      });

      if (error) throw error;
    } catch (error) {
      console.error('Failed to send reminder email:', error);
      throw error;
    }
  }

  private generateReminderEmail(event: SpecialDate, recommendations: any[]): EmailContent {
    const eventDate = new Date(event.date).toLocaleDateString();
    const giftSuggestions = recommendations
      .slice(0, 3)
      .map(gift => `- ${gift.title} (${gift.price}): ${gift.url}`)
      .join('\n');

    return {
      subject: `Upcoming Event Reminder: ${event.occasion}`,
      body: `
Don't forget! ${event.occasion} is coming up on ${eventDate}.

Here are some gift suggestions we picked just for you:

${giftSuggestions}

Visit your dashboard for more recommendations: ${window.location.origin}/dashboard
      `.trim()
    };
  }
}