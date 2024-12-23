import React from 'react';
import { Notification } from '../../../types/Notification';
import NotificationItem from './NotificationItem';

interface NotificationsListProps {
  notifications: Notification[];
  onNotificationAction: (notification: Notification) => void;
}

export default function NotificationsList({ 
  notifications, 
  onNotificationAction 
}: NotificationsListProps) {
  if (notifications.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        Nessuna notifica
      </div>
    );
  }

  return (
    <div className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
      {notifications.map(notification => (
        <NotificationItem
          key={notification.id}
          notification={notification}
          onAction={onNotificationAction}
        />
      ))}
    </div>
  );
}