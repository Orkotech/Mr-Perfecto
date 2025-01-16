import React from 'react';
import { Calendar, Gift } from 'lucide-react';
import { getDaysUntilEvent } from '../../utils/dateUtils';
import type { SpecialDate } from '../../types';

interface UpcomingEventsProps {
  events: SpecialDate[];
}

export function UpcomingEvents({ events }: UpcomingEventsProps) {
  const sortedEvents = [...events].sort(
    (a, b) => getDaysUntilEvent(a.date) - getDaysUntilEvent(b.date)
  );

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-semibold text-gray-900 mb-4">Moments to Celebrate</h2>
      <div className="space-y-4">
        {sortedEvents.map((event) => {
          const daysUntil = getDaysUntilEvent(event.date);
          const nextDate = new Date(event.date);
          nextDate.setFullYear(new Date().getFullYear());
          if (nextDate < new Date()) {
            nextDate.setFullYear(nextDate.getFullYear() + 1);
          }

          return (
            <div
              key={`${event.id}-${event.date}-${event.occasion}`}
              className="flex items-center p-4 border rounded-lg hover:bg-rose-50 transition-colors"
            >
              <div className="flex-shrink-0 mr-4">
                <Calendar className="h-8 w-8 text-rose-600" />
              </div>
              <div className="flex-grow">
                <h3 className="text-lg font-medium text-gray-900">{event.occasion}</h3>
                <p className="text-sm text-gray-500">
                  {nextDate.toLocaleDateString('en-US', { 
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </p>
              </div>
              <div className="flex-shrink-0 ml-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-rose-100 text-rose-800">
                  {daysUntil} days left
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}