import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { InterestSelector } from '../components/partner/InterestSelector';
import { DateInput } from '../components/common/DateInput';
import { SpecialDatesSection } from '../components/partner/SpecialDatesSection';
import toast from 'react-hot-toast';
import type { SpecialDate } from '../types';

export default function PartnerSetup() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    birthDate: '',
    anniversaryDate: '',
    interests: [] as string[],
    favoriteColors: [] as string[],
    clothingSize: '',
    shoeSize: '',
    jewelryPreferences: [] as string[],
  });
  const [customDates, setCustomDates] = useState<
    Omit<SpecialDate, 'id' | 'user_id' | 'partner_id' | 'created_at'>[]
  >([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Insert partner data
      const { data: partner, error: partnerError } = await supabase
        .from('partners')
        .insert({
          user_id: user?.id,
          name: formData.name,
          birth_date: formData.birthDate,
          anniversary_date: formData.anniversaryDate || null,
          interests: formData.interests,
          favorite_colors: formData.favoriteColors,
          clothing_size: formData.clothingSize,
          shoe_size: formData.shoeSize,
          jewelry_preferences: formData.jewelryPreferences,
        })
        .select()
        .single();

      if (partnerError) throw partnerError;

      // Insert custom special dates
      if (customDates.length > 0) {
        const { error: datesError } = await supabase
          .from('special_dates')
          .insert(
            customDates.map(date => ({
              user_id: user?.id,
              partner_id: partner.id,
              ...date
            }))
          );

        if (datesError) throw datesError;
      }

      toast.success('Partner profile created successfully!');
      navigate('/dashboard');
    } catch (error) {
      toast.error('Failed to create partner profile');
      console.error('Error:', error);
    }
  };

  const handleAddDate = (date: Omit<SpecialDate, 'id' | 'user_id' | 'partner_id' | 'created_at'>) => {
    if (customDates.length < 3) {
      setCustomDates([...customDates, date]);
    }
  };

  const handleRemoveDate = (index: number) => {
    setCustomDates(customDates.filter((_, i) => i !== index));
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Tell Us About Your Partner</h1>
      <form onSubmit={handleSubmit} className="space-y-8 bg-white p-6 rounded-lg shadow">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500"
              required
            />
          </div>

          <DateInput
            label="Birth Date"
            value={formData.birthDate}
            onChange={(date) => setFormData({ ...formData, birthDate: date })}
            required
          />

          <DateInput
            label="Anniversary Date (Optional)"
            value={formData.anniversaryDate}
            onChange={(date) => setFormData({ ...formData, anniversaryDate: date })}
          />

          <InterestSelector
            interests={formData.interests}
            onChange={(interests) => setFormData({ ...formData, interests })}
          />

          <div>
            <label className="block text-sm font-medium text-gray-700">Clothing Size</label>
            <input
              type="text"
              value={formData.clothingSize}
              onChange={(e) => setFormData({ ...formData, clothingSize: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Shoe Size</label>
            <input
              type="text"
              value={formData.shoeSize}
              onChange={(e) => setFormData({ ...formData, shoeSize: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500"
            />
          </div>
        </div>

        <SpecialDatesSection
          customDates={customDates}
          onAddDate={handleAddDate}
          onRemoveDate={handleRemoveDate}
        />

        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-rose-600 hover:bg-rose-700"
        >
          Create Partner Profile
        </button>
      </form>
    </div>
  );
}