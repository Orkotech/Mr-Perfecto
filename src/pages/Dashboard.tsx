import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { GiftSuggestions } from '../components/dashboard/GiftSuggestions';
import { UpcomingEvents } from '../components/dashboard/UpcomingEvents';
import { ExperienceGifts } from '../components/dashboard/ExperienceGifts';
import { DailyChallenge } from '../components/dashboard/DailyChallenge';
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
    <div className="min-h-screen bg-gradient-to-b from-black to-rose-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Daily Challenge Section */}
        {user && (
          <div className="mb-8 transform hover:scale-[1.01] transition-transform">
            <div className="bg-black/40 backdrop-blur-sm rounded-lg border border-rose-500/20 shadow-lg shadow-rose-900/20">
              <DailyChallenge user={user} />
            </div>
          </div>
        )}

        {/* Main Dashboard Grid */}
        <div className="grid gap-8 md:grid-cols-2">
          {/* Left Column */}
          <div className="space-y-8">
            {/* Upcoming Events Card */}
            <div className="transform hover:scale-[1.01] transition-transform">
              <div className="bg-black/40 backdrop-blur-sm rounded-lg border border-rose-500/20 shadow-lg shadow-rose-900/20">
                <UpcomingEvents events={events} />
              </div>
            </div>

            {/* Experience Gifts Card */}
            <div className="transform hover:scale-[1.01] transition-transform">
              <div className="bg-black/40 backdrop-blur-sm rounded-lg border border-rose-500/20 shadow-lg shadow-rose-900/20">
                <ExperienceGifts />
              </div>
            </div>
          </div>

          {/* Right Column - Gift Suggestions */}
          {partner && (
            <div className="transform hover:scale-[1.01] transition-transform">
              <div className="bg-black/40 backdrop-blur-sm rounded-lg border border-rose-500/20 shadow-lg shadow-rose-900/20">
                <GiftSuggestions partner={partner} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}