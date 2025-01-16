import React from 'react';
import { Link } from 'react-router-dom';
import { Gift, Calendar, Bell } from 'lucide-react';

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
          <span className="block">Become Her</span>
          <span className="block text-rose-600">Perfect Partner</span>
        </h1>
        <div className="flex justify-center p-4">
          <img
src="https://nhbrzkpykisjvldzcskp.supabase.co/storage/v1/object/public/media/logo.png"
            alt="Mr. Perfecto"
            className="h-32 w-32"
          />
        </div>
        <p className="mt-0 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
          Never miss an important date again. Get personalized gift recommendations
          and romantic ideas to keep the spark alive.
        </p>
        <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
          <Link
            to="/register"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-rose-600 hover:bg-rose-700"
          >
            Dive Into Love
          </Link>
        </div>
      </div>

      <div className="mt-24">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="pt-6">
            <div className="flow-root bg-white rounded-lg px-6 pb-8">
              <div className="-mt-6">
                <div className="inline-flex items-center justify-center p-3 bg-rose-500 rounded-md shadow-lg">
                  <img
                    src="https://i.imgur.com/8tZT2Kl.png"
                    alt="Special Dates"
                    className="h-6 w-6 invert"
                  />
                </div>
                <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">Special Dates</h3>
                <p className="mt-5 text-base text-gray-500">
                  Never forget birthdays, anniversaries, and other special occasions
                </p>
              </div>
            </div>
          </div>

          <div className="pt-6">
            <div className="flow-root bg-white rounded-lg px-6 pb-8">
              <div className="-mt-6">
                <div className="inline-flex items-center justify-center p-3 bg-rose-500 rounded-md shadow-lg">
                  <Gift className="h-6 w-6 text-white" />
                </div>
                <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">Perfect Gifts</h3>
                <p className="mt-5 text-base text-gray-500">
                  Get personalized gift recommendations based on her interests
                </p>
              </div>
            </div>
          </div>

<div className="pt-6">
  <div className="flow-root bg-white rounded-lg px-6 pb-8 flex flex-col h-full">
    <div className="-mt-6">
      <div className="inline-flex items-center justify-center p-3 bg-rose-500 rounded-md shadow-lg">
        <Calendar className="h-6 w-6 text-white" />
      </div>
      <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">Smart Planning</h3>
      <p className="mt-5 text-base text-gray-500 flex-grow">
        Plan ahead with timely reminders and suggestions
      </p>
    </div>
  </div>
</div>


<div className="pt-6">
  <div className="flow-root bg-white rounded-lg px-6 pb-8 flex flex-col h-full">
    <div className="-mt-6">
      <div className="inline-flex items-center justify-center p-3 bg-rose-500 rounded-md shadow-lg">
        <Bell className="h-6 w-6 text-white" />
      </div>
      <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">Timely Reminders</h3>
      <p className="mt-5 text-base text-gray-500 flex-grow">
        Get notifications for upcoming events and gift ideas
      </p>
    </div>
  </div>
</div>
        </div>
      </div>
    </div>
  );
}