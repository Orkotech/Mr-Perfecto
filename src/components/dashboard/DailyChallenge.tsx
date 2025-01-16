import React, { useState, useEffect } from 'react';
import { Heart, Trophy, CheckCircle } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { DAILY_CHALLENGES } from '../../data/dailyChallenges';
import type { User } from '@supabase/supabase-js';

interface DailyChallengeProps {
  user: User;
}

export function DailyChallenge({ user }: DailyChallengeProps) {
  const [isCompleted, setIsCompleted] = useState(false);
  const [points, setPoints] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(DAILY_CHALLENGES[0]);

  useEffect(() => {
    const loadUserPoints = async () => {
      try {
        const { data, error } = await supabase
          .from('user_points')
          .select('points, last_challenge_date')
          .eq('user_id', user.id)
          .single();

        if (error && error.code !== 'PGRST116') throw error;

        if (data) {
          setPoints(data.points);
          // Check if challenge was completed today
          const lastDate = new Date(data.last_challenge_date);
          const today = new Date();
          if (lastDate.toDateString() === today.toDateString()) {
            setIsCompleted(true);
          }
        }
      } catch (error) {
        console.error('Error loading points:', error);
      }
    };

    // Get a random challenge for the day
    const todaysSeed = new Date().toDateString();
    const randomIndex = Math.floor(
      (hashString(todaysSeed) % DAILY_CHALLENGES.length)
    );
    setCurrentChallenge(DAILY_CHALLENGES[randomIndex]);

    loadUserPoints();
  }, [user.id]);

  const handleCompleteChallenge = async () => {
    try {
      const { data, error } = await supabase
        .from('user_points')
        .upsert({
          user_id: user.id,
          points: points + currentChallenge.points,
          last_challenge_date: new Date().toISOString()
        })
        .select()
        .single();

      if (error) throw error;

      setPoints(data.points);
      setIsCompleted(true);
    } catch (error) {
      console.error('Error updating points:', error);
    }
  };

  // Simple hash function for consistent daily challenges
  const hashString = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return Math.abs(hash);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-900">Daily Challenge</h2>
        <div className="flex items-center space-x-2">
          <Heart className="h-5 w-5 text-rose-500" fill="currentColor" />
          <span className="font-medium text-gray-700">{points}</span>
        </div>
      </div>

      <div className="bg-rose-50 rounded-lg p-4 mb-4">
        <p className="text-gray-800 font-medium">Today's Challenge:</p>
        <p className="text-gray-600 mt-2">
          {currentChallenge.description}
        </p>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Heart className="h-5 w-5 text-yellow-500" />
          <span className="text-sm text-gray-600">+{currentChallenge.points} hearts</span>
        </div>
        
        <button
          onClick={handleCompleteChallenge}
          disabled={isCompleted}
          className={`
            inline-flex items-center px-4 py-2 rounded-md text-sm font-medium
            ${isCompleted 
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-rose-600 text-white hover:bg-rose-700'
            }
          `}
        >
          {isCompleted ? (
            <>
              <CheckCircle className="h-5 w-5 mr-2" />
              Completed
            </>
          ) : (
            'Complete Challenge'
          )}
        </button>
      </div>
    </div>
  );
} 