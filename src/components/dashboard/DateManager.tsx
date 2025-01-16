import React, { useState } from 'react';
import { Calendar, Plus } from 'lucide-react';
import { DEFAULT_SPECIAL_DATES } from '../../data/specialDates';
import type { SpecialDate } from '../../types';

interface DateManagerProps {
  onAddDate: (date: Omit<SpecialDate, 'id' | 'user_id' | 'partner_id' | 'created_at'>) => void;
  customDatesCount: number;
}

export function DateManager({ onAddDate, customDatesCount }: DateManagerProps) {
  const [newDate, setNewDate] = useState({ date: '', occasion: '', notes: '' });
  const canAddMore = customDatesCount < 3;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newDate.date && newDate.occasion) {
      onAddDate(newDate);
      setNewDate({ date: '', occasion: '', notes: '' });
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Calendar className="h-6 w-6 text-rose-600 mr-2" />
          <h2 className="text-2xl font-semibold text-gray-900">Add Special Date</h2>
        </div>
        <span className="text-sm text-gray-500">
          {3 - customDatesCount} dates remaining
        </span>
      </div>

      {canAddMore ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Date</label>
            <input
              type="date"
              value={newDate.date}
              onChange={(e) => setNewDate({ ...newDate, date: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Occasion</label>
            <input
              type="text"
              value={newDate.occasion}
              onChange={(e) => setNewDate({ ...newDate, occasion: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500"
              required
              placeholder="e.g., Anniversary Dinner"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Notes (Optional)</label>
            <textarea
              value={newDate.notes}
              onChange={(e) => setNewDate({ ...newDate, notes: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500"
              rows={2}
              placeholder="Add any special notes or reminders"
            />
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-rose-600 hover:bg-rose-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Special Date
          </button>
        </form>
      ) : (
        <p className="text-center text-gray-500">
          You've reached the maximum number of custom dates (3)
        </p>
      )}
    </div>
  );
}