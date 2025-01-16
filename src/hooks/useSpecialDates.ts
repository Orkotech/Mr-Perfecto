import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { DEFAULT_SPECIAL_DATES } from '../data/specialDates';
import type { SpecialDate, Partner } from '../types';

export function useSpecialDates(user: any, partner: Partner | null) {
  const [events, setEvents] = useState<SpecialDate[]>([]);
  const [customDatesCount, setCustomDatesCount] = useState(0);

  useEffect(() => {
    if (user && partner) {
      loadSpecialDates();
    }
  }, [user, partner]);

  const loadSpecialDates = async () => {
    try {
      const { data, error } = await supabase
        .from('special_dates')
        .select('*')
        .eq('user_id', user.id);

      if (error) throw error;

      // Process default dates
      const processedDefaultDates = DEFAULT_SPECIAL_DATES.map(date => ({
        ...date,
        date: date.date === 'BIRTHDAY_PLACEHOLDER' ? partner?.birth_date :
              date.date === 'ANNIVERSARY_PLACEHOLDER' ? partner?.anniversary_date :
              date.date
      })).filter(date => date.date) as SpecialDate[];

      // Combine default and custom dates
      const allDates = [...processedDefaultDates, ...data];
      setEvents(allDates);
      setCustomDatesCount(data.length);
    } catch (error) {
      console.error('Error loading special dates:', error);
    }
  };

  const addSpecialDate = async (newDate: Omit<SpecialDate, 'id' | 'user_id' | 'partner_id' | 'created_at'>) => {
    try {
      const { data, error } = await supabase
        .from('special_dates')
        .insert({
          user_id: user.id,
          partner_id: partner?.id,
          ...newDate
        })
        .select()
        .single();

      if (error) throw error;

      setEvents(prev => [...prev, data]);
      setCustomDatesCount(prev => prev + 1);
    } catch (error) {
      console.error('Error adding special date:', error);
    }
  };

  return {
    events,
    customDatesCount,
    addSpecialDate
  };
}