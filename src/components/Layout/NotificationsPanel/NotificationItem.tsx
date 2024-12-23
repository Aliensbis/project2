import React from 'react';
import { FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Notification } from '../../../types/Notification';
import { formatDate } from '../../../utils/dateUtils';
import { getNotificationLink } from '../../../utils/notificationUtils';

interface NotificationItemProps {
  notification: Notification;
  onAction: (notification: Notification) => void;
}

export default function NotificationItem({ notification, onAction }: NotificationItemProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    onAction(notification);
    const link = getNotificationLink(notification);
    if (link) {
      navigate(link);
    }
  };

  return (
    <div
      className={`p-4 cursor-pointer hover:bg-gray-50 ${
        notification.read ? 'bg-white' : 'bg-blue-50'
      }`}
      onClick={handleClick}
    >
      <div className="flex justify-between items-start">
        <div>
          <p className="font-medium text-gray-900">{notification.title}</p>
          <p className="mt-1 text-sm text-gray-600">{notification.message}</p>
          <p className="mt-1 text-xs text-gray-500">
            {formatDate(notification.createdAt)}
          </p>
        </div>
        {notification.action === 'print-ddt' && (
          <FileText className="h-5 w-5 text-blue-500" />
        )}
      </div>
    </div>
  );
}