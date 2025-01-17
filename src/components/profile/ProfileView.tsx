import React from 'react';
import { Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Partner, SpecialDate } from '../../types';

interface ProfileViewProps {
  partner: Partner;
  customDates: Omit<SpecialDate, 'id' | 'user_id' | 'partner_id' | 'created_at'>[];
}

export function ProfileView({ partner, customDates }: ProfileViewProps) {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow space-y-6">
        <div>
          <h3 className="text-sm font-medium text-gray-500">Name</h3>
          <p className="mt-1 text-lg text-gray-900">{partner.name}</p>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-500">Birth Date</h3>
          <p className="mt-1 text-lg text-gray-900">
            {new Date(partner.birth_date).toLocaleDateString()}
          </p>
        </div>

        {partner.anniversary_date && (
          <div>
            <h3 className="text-sm font-medium text-gray-500">Anniversary</h3>
            <p className="mt-1 text-lg text-gray-900">
              {new Date(partner.anniversary_date).toLocaleDateString()}
            </p>
          </div>
        )}

        <div>
          <h3 className="text-sm font-medium text-gray-500">Interests</h3>
          <div className="mt-1 flex flex-wrap gap-2">
            {partner.interests.map((interest) => (
              <span
                key={interest}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-rose-100 text-rose-800"
              >
                {interest}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-500">Custom Special Dates</h3>
          <div className="mt-2 space-y-2">
            {customDates.map((date, index) => (
              <div key={index} className="flex items-center text-gray-700">
                <Calendar className="h-4 w-4 mr-2 text-rose-500" />
                <span className="font-medium">{date.occasion}</span>
                <span className="mx-2">-</span>
                <span>{new Date(date.date).toLocaleDateString()}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-500">Clothing Size</h3>
          <p className="mt-1 text-lg text-gray-900">{partner.clothing_size}</p>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-500">Shoe Size</h3>
          <p className="mt-1 text-lg text-gray-900">{partner.shoe_size}</p>
        </div>
      </div>

      {/* Quiz Button */}
      <Link
        to="/quiz"
        className="block w-full bg-black/40 backdrop-blur-sm text-white p-6 rounded-lg border border-rose-500/20 shadow-lg shadow-rose-900/20 hover:bg-black/50 transition-all duration-200 group"
      >
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-2 text-rose-400 group-hover:text-rose-300">
            Relationship Foundation Quiz
          </h3>
          <p className="text-gray-300 group-hover:text-gray-200">
            Discover the strength of your relationship and get personalized insights
          </p>
        </div>
      </Link>
    </div>
  );
}