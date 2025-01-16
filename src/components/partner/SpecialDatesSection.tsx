import React from 'react';
import { Calendar, Plus, Trash2 } from 'lucide-react';
import { DEFAULT_SPECIAL_DATES } from '../../data/specialDates';
import type { SpecialDate } from '../../types';

interface SpecialDatesSectionProps {
  customDates: Omit<SpecialDate, 'id' | 'user_id' | 'partner_id' | 'created_at'>[];
  onAddDate: (date: Omit<SpecialDate, 'id' | 'user_id' | 'partner_id' | 'created_at'>) => void;
  onRemoveDate: (index: number) => void;
}

export function SpecialDatesSection({ customDates, onAddDate, onRemoveDate }: SpecialDatesSectionProps) {
  const canAddMore = customDates.length < 3;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const target = e.target as HTMLFormElement;
    const formData = new FormData(target);
    
    onAddDate({
      date: formData.get('date') as string,
      occasion: formData.get('occasion') as string,
      notes: formData.get('notes') as string
    });
    
    target.reset();
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Special Dates</h3>
      
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Default Special Dates</h4>
        <div className="space-y-2">
          {DEFAULT_SPECIAL_DATES.map((date, index) => (
            <div key={index} className="flex items-center text-sm text-gray-600">
              <Calendar className="h-4 w-4 mr-2 text-rose-500" />
              {date.occasion}
            </div>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-sm font-medium text-gray-700">Custom Special Dates</h4>
          <span className="text-sm text-gray-500">
            {3 - customDates.length} remaining
          </span>
        </div>
        
        {customDates.map((date, index) => (
          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-md mb-2">
            <div>
              <p className="font-medium">{date.occasion}</p>
              <p className="text-sm text-gray-600">{new Date(date.date).toLocaleDateString()}</p>
            </div>
            <button
              type="button"
              onClick={() => onRemoveDate(index)}
              className="text-gray-400 hover:text-rose-500"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>

      {canAddMore && (
        <div className="space-y-4 border-t pt-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Date</label>
              <input
                type="date"
                name="date"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Occasion</label>
              <input
                type="text"
                name="occasion"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500"
                required
                placeholder="e.g., First Date Anniversary"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Notes (Optional)</label>
            <textarea
              name="notes"
              rows={2}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500"
              placeholder="Add any special notes or reminders"
            />
          </div>
          <button
            onClick={handleSubmit}
            className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-rose-600 hover:bg-rose-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Special Date
          </button>
        </div>
      )}
    </div>
  );
}