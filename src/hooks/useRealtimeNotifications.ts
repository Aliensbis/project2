import { useState, useEffect, useCallback } from 'react';
import { Notification } from '../types/Notification';
import { subscribeToNotifications, createNotification, markNotificationAsRead } from '../services/firebase/notifications';
import { useAuth } from './useAuth';

export function useRealtimeNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;
    
    const unsubscribe = subscribeToNotifications(user.id, setNotifications);
    return () => unsubscribe();
  }, [user]);

  const addNotification = useCallback((notification: Omit<Notification, 'id' | 'createdAt' | 'read'>) => {
    return createNotification(notification);
  }, []);

  const markAsRead = useCallback((notificationId: string) => {
    if (!user) return;
    return markNotificationAsRead(user.id, notificationId);
  }, [user]);

  return {
    notifications,
    addNotification,
    markAsRead
  };
}