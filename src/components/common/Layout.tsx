import React from 'react';
import { Navbar } from '../../components/navigation/Navbar';
import { Footer } from '../../components/navigation/Footer';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-rose-900">
      <Navbar />
      <main className="min-h-[calc(100vh-4rem)]">
        {children}
      </main>
      <Footer />
    </div>
  );
} 