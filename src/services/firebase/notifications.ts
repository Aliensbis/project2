import { ref, push, set, update, query, orderByChild, onValue } from 'firebase/database';
import { db } from '../../config/firebase';
import { Notification } from '../../types/Notification';

export function subscribeToNotifications(userId: string, onUpdate: (notifications: Notification[]) => void) {
  const notificationsRef = ref(db, `notifications/${userId}`);
  const notificationsQuery = query(notificationsRef, orderByChild('createdAt'));
  
  return onValue(notificationsQuery, (snapshot) => {
    const notifications: Notification[] = [];
    snapshot.forEach((child) => {
      notifications.push({ id: child.key!, ...child.val() });
    });
    onUpdate(notifications.reverse());
  });
}

export function createNotification(notification: Omit<Notification, 'id' | 'createdAt' | 'read'>) {
  const notificationsRef = ref(db, `notifications/${notification.userId}`);
  const newNotificationRef = push(notificationsRef);
  
  const notificationData = {
    ...notification,
    createdAt: new Date().toISOString(),
    read: false,
    link: getNotificationLink(notification)
  };
  
  return set(newNotificationRef, notificationData);
}

function getNotificationLink(notification: Omit<Notification, 'id' | 'createdAt' | 'read'>) {
  switch (notification.type) {
    case 'order':
      return `/orders/${notification.orderId}`;
    case 'chat':
      return `/chat/${notification.chatId}`;
    case 'complaint':
      return `/complaints/${notification.complaintId}`;
    default:
      return null;
  }
}

export function markNotificationAsRead(userId: string, notificationId: string) {
  const notificationRef = ref(db, `notifications/${userId}/${notificationId}`);
  return update(notificationRef, { read: true });
}