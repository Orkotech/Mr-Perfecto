import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { GiftSuggestions } from '../components/dashboard/GiftSuggestions';
import { UpcomingEvents } from '../components/dashboard/UpcomingEvents';
import { ExperienceGifts } from '../components/dashboard/ExperienceGifts';
import { useReminderScheduler } from '../hooks/useReminderScheduler';
import { useSpecialDates } from '../hooks/useSpecialDates';
import type { Partner } from '../types';

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [partner, setPartner] = useState<Partner | null>(null);
  const { events } = useSpecialDates(user, partner);
  
  useReminderScheduler(user, partner, events);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const loadPartner = async () => {
      try {
        const { data, error } = await supabase
          .from('partners')
          .select('*')
          .eq('user_id', user.id)
          .single();

        if (error) throw error;
        setPartner(data);
      } catch (error) {
        console.error('Error loading partner:', error);
      }
    };

    loadPartner();
  }, [user, navigate]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-8">
          <UpcomingEvents events={events} />
          <ExperienceGifts />
        </div>
        {partner && (
          <div>
            <GiftSuggestions partner={partner} />
          </div>
        )}
      </div>
    </div>
  );
}