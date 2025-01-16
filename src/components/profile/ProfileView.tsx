import React from 'react';
import { Calendar } from 'lucide-react';
import type { Partner, SpecialDate } from '../../types';

interface ProfileViewProps {
  partner: Partner;
  customDates: Omit<SpecialDate, 'id' | 'user_id' | 'partner_id' | 'created_at'>[];
}

export function ProfileView({ partner, customDates }: ProfileViewProps) {
  return (
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
  );
}