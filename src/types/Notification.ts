export type NotificationAction = 'print-ddt';
export type NotificationType = 'order' | 'production' | 'system';

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: NotificationType;
  createdAt: string;
  read: boolean;
  orderId?: string;
  action?: NotificationAction;
  eventId: string; // Make eventId required to ensure uniqueness
}

export interface NotificationStore {
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id' | 'createdAt' | 'read'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearAll: () => void;
}