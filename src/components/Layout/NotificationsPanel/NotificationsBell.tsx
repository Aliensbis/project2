import React from 'react';
import { Bell } from 'lucide-react';

interface NotificationsBellProps {
  unreadCount: number;
  onClick: () => void;
}

export default function NotificationsBell({ unreadCount, onClick }: NotificationsBellProps) {
  return (
    <button 
      className="relative p-2 text-gray-600 hover:text-gray-900"
      onClick={onClick}
    >
      <Bell className="h-6 w-6" />
      {unreadCount > 0 && (
        <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
          {unreadCount}
        </span>
      )}
    </button>
  );
}