import { Order, Customer } from '../types/Order';
import { Notification } from '../types/Notification';

export const generateNotificationId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

export const createNotification = (
  data: Omit<Notification, 'id' | 'createdAt' | 'read'>
): Notification => {
  return {
    ...data,
    id: generateNotificationId(),
    createdAt: new Date().toISOString(),
    read: false
  };
};

export const filterNotificationsByUser = (
  notifications: Notification[],
  userId: string
): Notification[] => {
  return notifications.filter(n => n.userId === userId);
};

export const sortNotificationsByDate = (
  notifications: Notification[]
): Notification[] => {
  return [...notifications].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
};

export const isDuplicateNotification = (
  notifications: Notification[],
  newNotification: Omit<Notification, 'id' | 'createdAt' | 'read'>
): boolean => {
  return notifications.some(n => 
    n.eventId === newNotification.eventId && 
    n.userId === newNotification.userId &&
    (Date.now() - new Date(n.createdAt).getTime()) < 3600000
  );
};

export const cleanupOldNotifications = (
  notifications: Notification[],
  maxAgeDays: number = 30
): Notification[] => {
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - maxAgeDays);
  
  return notifications.filter(n => 
    new Date(n.createdAt) > cutoffDate
  );
};

export const getNotificationLink = (notification: Notification): string | null => {
  switch (notification.type) {
    case 'order':
      return `/orders?id=${notification.orderId}`;
    case 'complaint':
      return `/complaints?id=${notification.complaintId}`;
    case 'production':
      return '/production';
    case 'system':
      return null;
    default:
      return null;
  }
};

export const notifyOrderUpdate = (
  order: Order, 
  action: 'new' | 'status-change',
  customers: Customer[],
  addNotification: (notification: Omit<Notification, 'id' | 'createdAt' | 'read'>) => void
) => {
  const customer = customers.find(c => c.id === order.customerId);
  if (!customer) return;

  if (action === 'new') {
    addNotification({
      userId: 'production',
      title: 'Nuovo Ordine',
      message: `Nuovo ordine ricevuto da ${customer.name}`,
      type: 'order',
      orderId: order.id,
      eventId: `new-order-${order.id}`
    });
  } else if (action === 'status-change') {
    switch (order.status) {
      case 'in-progress':
        addNotification({
          userId: 'admin',
          title: 'Ordine in Lavorazione',
          message: `L'ordine di ${customer.name} è stato avviato in produzione`,
          type: 'order',
          orderId: order.id,
          eventId: `order-${order.id}-in-progress`
        });
        break;
      case 'completed':
        addNotification({
          userId: 'admin',
          title: 'Ordine Completato',
          message: `La produzione ha completato l'ordine di ${customer.name}`,
          type: 'order',
          orderId: order.id,
          eventId: `order-${order.id}-completed`
        });
        break;
      case 'shipped':
        addNotification({
          userId: 'admin',
          title: 'Ordine Spedito',
          message: `L'ordine di ${customer.name} è stato spedito`,
          type: 'order',
          orderId: order.id,
          eventId: `order-${order.id}-shipped`
        });
        break;
    }
  }
};