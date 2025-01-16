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
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SignupForm onSubmit={handleRegister} isLoading={isLoading} />
        
        <div className="text-center mt-8">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <Link
              to="/login"
              className="font-medium text-rose-600 hover:text-rose-500"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}