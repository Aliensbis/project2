import React, { useState, useRef, useEffect } from 'react';
import { Bell, FileText } from 'lucide-react';
import { useNotifications } from '../../hooks/useNotifications';
import { formatDate } from '../../utils/dateUtils';
import { generateDeliveryNote } from '../../utils/deliveryNoteGenerator';
import { useOrders } from '../../hooks/useOrders';
import { useAuth } from '../../hooks/useAuth';

export default function NotificationsPanel() {
  const { user } = useAuth();
  const { notifications, markAsRead, markAllAsRead, clearAll } = useNotifications(user?.role || '');
  const { orders, customers } = useOrders();
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

  const handleNotificationAction = (notification: any) => {
    if (notification.action === 'print-ddt') {
      const order = orders.find(o => o.id === notification.orderId);
      const customer = order ? customers.find(c => c.id === order.customerId) : null;
      
      if (order && customer) {
        generateDeliveryNote(order, customer);
      }
    }
    
    markAsRead(notification.id);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={panelRef}>
      <button 
        className="relative p-2 text-gray-600 hover:text-gray-900"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Bell className="h-6 w-6" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-lg overflow-hidden z-50">
          <div className="p-4 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900">Notifiche</h3>
              <div className="space-x-2">
                <button
                  onClick={() => {
                    markAllAsRead();
                    setIsOpen(false);
                  }}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  Segna tutte come lette
                </button>
                <button
                  onClick={() => {
                    clearAll();
                    setIsOpen(false);
                  }}
                  className="text-sm text-red-600 hover:text-red-800"
                >
                  Cancella tutte
                </button>
              </div>
            </div>
          </div>

          <div className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
            {notifications.length > 0 ? (
              notifications.map(notification => (
                <div
                  key={notification.id}
                  className={`p-4 cursor-pointer hover:bg-gray-50 ${
                    notification.read ? 'bg-white' : 'bg-blue-50'
                  }`}
                  onClick={() => handleNotificationAction(notification)}
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
              ))
            ) : (
              <div className="p-4 text-center text-gray-500">
                Nessuna notifica
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}