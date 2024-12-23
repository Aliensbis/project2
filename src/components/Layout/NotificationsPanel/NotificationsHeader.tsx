import React from 'react';

interface NotificationsHeaderProps {
  onMarkAllAsRead: () => void;
  onClearAll: () => void;
}

export default function NotificationsHeader({ 
  onMarkAllAsRead, 
  onClearAll 
}: NotificationsHeaderProps) {
  return (
    <div className="p-4 border-b border-gray-200">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">Notifiche</h3>
        <div className="space-x-2">
          <button
            onClick={onMarkAllAsRead}
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            Segna tutte come lette
          </button>
          <button
            onClick={onClearAll}
            className="text-sm text-red-600 hover:text-red-800"
          >
            Cancella tutte
          </button>
        </div>
      </div>
    </div>
  );
}