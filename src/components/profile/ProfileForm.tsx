import React from 'react';
import { DateInput } from '../common/DateInput';
import { InterestSelector } from '../partner/InterestSelector';
import { SpecialDatesSection } from '../partner/SpecialDatesSection';
import type { SpecialDate } from '../../types';

interface FormData {
  name: string;
  birthDate: string;
  anniversaryDate: string;
  interests: string[];
  favoriteColors: string[];
  clothingSize: string;
  shoeSize: string;
  jewelryPreferences: string[];
}

interface ProfileFormProps {
  formData: FormData;
  customDates: Omit<SpecialDate, 'id' | 'user_id' | 'partner_id' | 'created_at'>[];
  onSubmit: (e: React.FormEvent) => Promise<void>;
  onChange: (data: Partial<FormData>) => void;
  onAddDate: (date: Omit<SpecialDate, 'id' | 'user_id' | 'partner_id' | 'created_at'>) => void;
  onRemoveDate: (index: number) => void;
}

export function ProfileForm({ formData, customDates, onSubmit, onChange, onAddDate, onRemoveDate }: ProfileFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-8 bg-white p-6 rounded-lg shadow">
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => onChange({ name: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500"
            required
          />
        </div>

        <DateInput
          label="Birth Date"
          value={formData.birthDate}
          onChange={(date) => onChange({ birthDate: date })}
          required
        />

        <DateInput
          label="Anniversary Date"
          value={formData.anniversaryDate}
          onChange={(date) => onChange({ anniversaryDate: date })}
        />

        <InterestSelector
          interests={formData.interests}
          onChange={(interests) => onChange({ interests })}
        />

        <div>
          <label className="block text-sm font-medium text-gray-700">Clothing Size</label>
          <input
            type="text"
            value={formData.clothingSize}
            onChange={(e) => onChange({ clothingSize: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Shoe Size</label>
          <input
            type="text"
            value={formData.shoeSize}
            onChange={(e) => onChange({ shoeSize: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500"
          />
        </div>
      </div>

      <SpecialDatesSection
        customDates={customDates}
        onAddDate={onAddDate}
        onRemoveDate={onRemoveDate}
      />

      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-rose-600 hover:bg-rose-700"
      >
        Save Changes
      </button>
    </form>
  );
}