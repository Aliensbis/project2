import React from 'react';
import { Order, Customer } from '../../../types/Order';
import OrderListItem from './OrderListItem';

interface OrderListProps {
  orders: Order[];
  customers: Customer[];
  onUpdateOrder: (orderId: string, updates: Partial<Order>) => void;
  onDeleteOrder: (orderId: string) => void;
}

export default function OrderList({
  orders,
  customers,
  onUpdateOrder,
  onDeleteOrder
}: OrderListProps) {
  const [expandedOrders, setExpandedOrders] = React.useState<string[]>([]);

  const toggleOrder = (orderId: string) => {
    setExpandedOrders(prev => 
      prev.includes(orderId)
        ? prev.filter(id => id !== orderId)
        : [...prev, orderId]
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Ordini</h3>
      </div>
      <div className="divide-y divide-gray-200">
        {orders.map((order) => {
          const customer = customers.find(c => c.id === order.customerId);
          if (!customer) return null;

          return (
            <OrderListItem
              key={order.id}
              order={order}
              customer={customer}
              customers={customers}
              isExpanded={expandedOrders.includes(order.id)}
              onToggle={() => toggleOrder(order.id)}
              onUpdateOrder={onUpdateOrder}
              onDeleteOrder={onDeleteOrder}
            />
          );
        })}
      </div>
    </div>
  );
}