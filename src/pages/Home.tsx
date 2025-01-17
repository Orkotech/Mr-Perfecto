import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-rose-900">
      {/* Hero Section */}
      <div className="relative h-[600px]">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url("/images/hero-bg.jpg")', // Add a sensual, tasteful image
            backgroundBlendMode: 'overlay',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="relative max-w-7xl mx-auto px-4 py-32">
          <div className="max-w-xl">
            <h1 className="text-5xl font-bold text-white mb-6">
              Celebrate Love
              <span className="text-rose-500"> Every Day</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Discover thoughtful ways to express your love and strengthen your relationship
            </p>
            <Link
              to="/register"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-rose-600 hover:bg-rose-700 transition-colors"
            >
              <Heart className="h-5 w-5 mr-2" />
              Get Started
            </Link>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature Cards */}
          <div className="bg-black/40 backdrop-blur-sm p-6 rounded-lg border border-rose-500/20">
            <h3 className="text-xl font-semibold text-white mb-4">Daily Challenges</h3>
            <p className="text-gray-300">
              Engage in daily activities designed to strengthen your bond and show your love
            </p>
          </div>

          <div className="bg-black/40 backdrop-blur-sm p-6 rounded-lg border border-rose-500/20">
            <h3 className="text-xl font-semibold text-white mb-4">Gift Ideas</h3>
            <p className="text-gray-300">
              Get personalized gift suggestions based on your partner's interests and preferences
            </p>
          </div>

          <div className="bg-black/40 backdrop-blur-sm p-6 rounded-lg border border-rose-500/20">
            <h3 className="text-xl font-semibold text-white mb-4">Special Moments</h3>
            <p className="text-gray-300">
              Never miss important dates and create unforgettable memories together
            </p>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="bg-black/60 backdrop-blur-sm py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Love Stories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-black/40 p-6 rounded-lg border border-rose-500/20">
              <p className="text-gray-300 italic mb-4">
                "This app has transformed how I express love to my partner. The daily challenges keep our relationship fresh and exciting."
              </p>
              <p className="text-rose-400 font-medium">- Michael</p>
            </div>
            <div className="bg-black/40 p-6 rounded-lg border border-rose-500/20">
              <p className="text-gray-300 italic mb-4">
                "The gift suggestions are spot on! I've never been better at choosing presents that truly delight my partner."
              </p>
              <p className="text-rose-400 font-medium">- David</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}