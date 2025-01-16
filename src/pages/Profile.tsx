import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { ProfileView } from '../components/profile/ProfileView';
import { ProfileForm } from '../components/profile/ProfileForm';
import type { Partner, SpecialDate } from '../types';
import toast from 'react-hot-toast';

export default function Profile() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [partner, setPartner] = useState<Partner | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [customDates, setCustomDates] = useState<
    Omit<SpecialDate, 'id' | 'user_id' | 'partner_id' | 'created_at'>[]
  >([]);
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

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchPartnerAndDates = async () => {
      try {
        // Fetch partner data
        const { data: partnerData, error: partnerError } = await supabase
          .from('partners')
          .select('*')
          .eq('user_id', user.id)
          .single();

        if (partnerError) throw partnerError;
        setPartner(partnerData);

        // Fetch custom dates
        const { data: datesData, error: datesError } = await supabase
          .from('special_dates')
          .select('*')
          .eq('user_id', user.id);

        if (datesError) throw datesError;
        setCustomDates(datesData.map(({ date, occasion, notes }) => ({
          date,
          occasion,
          notes: notes || ''
        })));

        // Set form data
        setFormData({
          name: partnerData.name,
          birthDate: partnerData.birth_date,
          anniversaryDate: partnerData.anniversary_date || '',
          interests: partnerData.interests,
          favoriteColors: partnerData.favorite_colors,
          clothingSize: partnerData.clothing_size,
          shoeSize: partnerData.shoe_size,
          jewelryPreferences: partnerData.jewelry_preferences,
        });
      } catch (error) {
        toast.error('Failed to load profile data');
        console.error('Error:', error);
      }
    };

    fetchPartnerAndDates();
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Update partner data
      const { error: partnerError } = await supabase
        .from('partners')
        .update({
          name: formData.name,
          birth_date: formData.birthDate,
          anniversary_date: formData.anniversaryDate || null,
          interests: formData.interests,
          favorite_colors: formData.favoriteColors,
          clothing_size: formData.clothingSize,
          shoe_size: formData.shoeSize,
          jewelry_preferences: formData.jewelryPreferences,
        })
        .eq('user_id', user?.id);

      if (partnerError) throw partnerError;

      // Delete existing custom dates
      const { error: deleteError } = await supabase
        .from('special_dates')
        .delete()
        .eq('user_id', user?.id);

      if (deleteError) throw deleteError;

      // Insert new custom dates
      if (customDates.length > 0) {
        const { error: insertError } = await supabase
          .from('special_dates')
          .insert(
            customDates.map(date => ({
              user_id: user?.id,
              partner_id: partner?.id,
              ...date
            }))
          );

        if (insertError) throw insertError;
      }

      toast.success('Profile updated successfully!');
      setIsEditing(false);
    } catch (error) {
      toast.error('Failed to update profile');
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

  if (!partner) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center">
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Love's Portrait</h1>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-rose-600 hover:bg-rose-700"
        >
          {isEditing ? 'Cancel' : 'Edit Profile'}
        </button>
      </div>

      {isEditing ? (
        <ProfileForm
          formData={formData}
          customDates={customDates}
          onSubmit={handleSubmit}
          onChange={(data) => setFormData({ ...formData, ...data })}
          onAddDate={handleAddDate}
          onRemoveDate={handleRemoveDate}
        />
      ) : (
        <ProfileView partner={partner} customDates={customDates} />
      )}
    </div>
  );
}