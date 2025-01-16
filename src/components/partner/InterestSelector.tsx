import React from 'react';

const INTEREST_OPTIONS = [
  'Reading',
  'Cooking',
  'Travel',
  'Fashion',
  'Art',
  'Music',
  'Sports',
  'Photography',
  'Dancing',
  'Yoga',
  'Gardening',
  'Technology',
  'Movies',
  'Wine Tasting',
  'Spa & Wellness',
];

interface InterestSelectorProps {
  interests: string[];
  onChange: (interests: string[]) => void;
}

export function InterestSelector({ interests, onChange }: InterestSelectorProps) {
  const toggleInterest = (interest: string) => {
    if (interests.includes(interest)) {
      onChange(interests.filter((i) => i !== interest));
    } else {
      onChange([...interests, interest]);
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Interests</label>
      <div className="flex flex-wrap gap-2">
        {INTEREST_OPTIONS.map((interest) => (
          <button
            key={interest}
            type="button"
            onClick={() => toggleInterest(interest)}
            className={`px-3 py-1 rounded-full text-sm ${
              interests.includes(interest)
                ? 'bg-rose-600 text-white'
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            }`}
          >
            {interest}
          </button>
        ))}
      </div>
    </div>
  );
}