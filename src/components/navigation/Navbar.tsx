import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export function Navbar() {
  const { user, signOut } = useAuth();

  return (
    <nav className="bg-black/60 backdrop-blur-sm border-b border-rose-500/20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <Heart className="h-8 w-8 text-rose-500" />
            <span className="ml-2 text-xl font-bold text-white">Mr Perfecto</span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link to="/dashboard" className="text-gray-300 hover:text-white px-3 py-2">
                  Dashboard
                </Link>
                <Link to="/blog" className="text-gray-300 hover:text-white px-3 py-2">
                  Blog
                </Link>
                <Link to="/profile" className="text-gray-300 hover:text-white px-3 py-2">
                  Profile
                </Link>
                <button
                  onClick={signOut}
                  className="text-gray-300 hover:text-white px-3 py-2"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-300 hover:text-white px-3 py-2">
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-rose-600 text-white px-4 py-2 rounded-md hover:bg-rose-700 transition-colors"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
} 