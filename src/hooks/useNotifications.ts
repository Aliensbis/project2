import { useState, useEffect } from 'react';
import { Notification, NotificationStore } from '../types/Notification';
import { 
  createNotification, 
  filterNotificationsByUser, 
  sortNotificationsByDate,
  isDuplicateNotification,
  cleanupOldNotifications
} from '../utils/notificationUtils';
import { useLocalStorage } from './useLocalStorage';

export function useNotifications(userId: string): NotificationStore {
  const [notifications, setNotifications] = useLocalStorage<Notification[]>('notifications', []);
  const [userNotifications, setUserNotifications] = useState<Notification[]>([]);

  // Clean up old notifications and update user notifications
  useEffect(() => {
    const cleanedNotifications = cleanupOldNotifications(notifications);
    if (cleanedNotifications.length !== notifications.length) {
      setNotifications(cleanedNotifications);
    }

    const filtered = filterNotificationsByUser(cleanedNotifications, userId);
    const sorted = sortNotificationsByDate(filtered);
    setUserNotifications(sorted);
  }, [notifications, userId, setNotifications]);

  const addNotification = (notification: Omit<Notification, 'id' | 'createdAt' | 'read'>) => {
    if (isDuplicateNotification(notifications, notification)) {
      return;
    }

    const newNotification = createNotification({
      ...notification,
      userId: notification.userId || userId
    });

    setNotifications(prev => [newNotification, ...prev]);
  };

  const markAsRead = (notificationId: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === notificationId ? { ...n, read: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(n => n.userId === userId ? { ...n, read: true } : n)
    );
  };

  const clearAll = () => {
    setNotifications(prev => prev.filter(n => n.userId !== userId));
  };

  return {
    notifications: userNotifications,
    addNotification,
    markAsRead,
    markAllAsRead,
    clearAll
  };
}