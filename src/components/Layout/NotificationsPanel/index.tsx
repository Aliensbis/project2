import React, { useState, useRef, useEffect } from 'react';
import { useNotifications } from '../../../hooks/useNotifications';
import { useOrders } from '../../../hooks/useOrders';
import { useAuth } from '../../../hooks/useAuth';
import { generateDeliveryNote } from '../../../utils/deliveryNoteGenerator';
import { Notification } from '../../../types/Notification';
import NotificationsBell from './NotificationsBell';
import NotificationsHeader from './NotificationsHeader';
import NotificationsList from './NotificationsList';

export default function NotificationsPanel() {
  const { user } = useAuth();
  const { notifications, markAsRead, markAllAsRead, clearAll } = useNotifications(user?.role || '');
  const ordersContext = useOrders();
  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const unreadCount = notifications.filter(n => !n.read).length;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNotificationAction = (notification: Notification) => {
    if (notification.action === 'print-ddt' && notification.orderId) {
      const order = ordersContext.orders.find(o => o.id === notification.orderId);
      const customer = order ? ordersContext.customers.find(c => c.id === order.customerId) : null;
      
      if (order && customer) {
        generateDeliveryNote(order, customer);
      }
    }
    
    markAsRead(notification.id);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={panelRef}>
      <NotificationsBell 
        unreadCount={unreadCount} 
        onClick={() => setIsOpen(!isOpen)} 
      />

      {isOpen && (
        <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-lg overflow-hidden z-50">
          <NotificationsHeader
            onMarkAllAsRead={markAllAsRead}
            onClearAll={clearAll}
          />
          <NotificationsList
            notifications={notifications}
            onNotificationAction={handleNotificationAction}
          />
        </div>
      )}
    </div>
  );
}