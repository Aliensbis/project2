import React from 'react';
import Navbar from '../Navbar';
import ChatButton from '../Chat/ChatButton';
import NotificationsPanel from './NotificationsPanel';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <ChatButton />
      <NotificationsPanel />
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
}