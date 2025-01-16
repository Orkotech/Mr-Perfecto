import React from 'react';
import { Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-black/60 backdrop-blur-sm border-t border-rose-500/20">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col items-center">
          <div className="flex items-center mb-4">
            <Heart className="h-6 w-6 text-rose-500" />
            <span className="ml-2 text-lg font-bold text-white">Mr Perfecto</span>
          </div>
          <p className="text-gray-400 text-sm text-center">
            © {new Date().getFullYear()} Mr Perfecto. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
} 