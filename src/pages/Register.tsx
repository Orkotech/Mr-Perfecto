import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { SignupForm } from '../components/auth/SignupForm';
import toast from 'react-hot-toast';

export default function Register() {
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      await signUp(email, password);
      toast.success('Account created successfully! Please sign in.');
      navigate('/partner-setup');
    } catch (error) {
      toast.error('Failed to create account. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-rose-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-md mx-auto">
          <div className="bg-black/40 backdrop-blur-sm rounded-lg border border-rose-500/20 shadow-lg shadow-rose-900/20 p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white">Create Account</h2>
              <p className="mt-2 text-gray-300">
                Start your journey to becoming the perfect partner
              </p>
            </div>

            <SignupForm onSubmit={handleRegister} isLoading={isLoading} />
            
            <div className="text-center mt-6">
              <p className="text-gray-300">
                Already have an account?{' '}
                <Link
                  to="/login"
                  className="font-medium text-rose-400 hover:text-rose-300 transition-colors"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}