import React from 'react';
import { ExternalLink, Camera, Plane, Utensils, Heart, Wine, Sparkles } from 'lucide-react';
import { GIFT_EXPERIENCES } from '../../data/giftExperiences';

const iconMap = {
  Camera,
  Plane,
  Utensils,
  Heart,
  Wine,
  Sparkles
};

export function ExperienceGifts() {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Create Memories Together</h2>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {GIFT_EXPERIENCES.map((experience) => {
          const Icon = iconMap[experience.icon as keyof typeof iconMap];
          return (
            <a
              key={experience.title}
              href={experience.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 border rounded-lg hover:shadow-md transition-shadow group"
            >
              <div className="flex items-center mb-2">
                <Icon className="h-5 w-5 text-rose-600 mr-2" />
                <h3 className="text-lg font-medium text-gray-900 group-hover:text-rose-600">
                  {experience.title}
                </h3>
              </div>
              <p className="text-sm text-gray-600 mb-2">{experience.description}</p>
              <span className="text-sm text-rose-600 flex items-center">
                Explore <ExternalLink className="h-4 w-4 ml-1" />
              </span>
            </a>
          );
        })}
      </div>
    </div>
  );
}