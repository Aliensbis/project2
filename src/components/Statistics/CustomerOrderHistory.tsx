import React from 'react';
import { Order } from '../../types/Order';
import { formatDate } from '../../utils/dateUtils';

interface CustomerOrderHistoryProps {
  orders: Order[];
  period: 'week' | 'month' | 'year';
}

export default function CustomerOrderHistory({ orders, period }: CustomerOrderHistoryProps) {
  const now = new Date();
  const filteredOrders = orders.filter(order => {
    const orderDate = new Date(order.date);
    switch (period) {
      case 'week':
        return orderDate >= new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      case 'month':
        return orderDate >= new Date(now.setMonth(now.getMonth() - 1));
      case 'year':
        return orderDate >= new Date(now.setFullYear(now.getFullYear() - 1));
    }
  });

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">
        Storico Ordini {period === 'week' ? 'Settimanale' : period === 'month' ? 'Mensile' : 'Annuale'}
      </h3>
      
      <div className="space-y-4">
        {filteredOrders.map(order => (
          <div key={order.id} className="border-b border-gray-200 pb-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium">{formatDate(order.date)}</p>
                <p className="text-sm text-gray-600">
                  {order.items.reduce((sum, item) => sum + item.boxes, 0)} cartoni
                </p>
              </div>
              <div className={`px-2 py-1 rounded-full text-sm ${
                order.status === 'completed' ? 'bg-green-100 text-green-800' :
                order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                order.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                'bg-yellow-100 text-yellow-800'
              }`}>
                {order.status === 'completed' ? 'Completato' :
                 order.status === 'shipped' ? 'Spedito' :
                 order.status === 'cancelled' ? 'Annullato' :
                 'In Lavorazione'}
              </div>
            </div>
            
            <div className="mt-2 space-y-1">
              {order.items.map((item, index) => (
                <div key={index} className="text-sm text-gray-600 flex justify-between">
                  <span>Prodotto #{item.productId}</span>
                  <span>{item.boxes} cartoni</span>
                </div>
              ))}
            </div>
          </div>
        ))}

        {filteredOrders.length === 0 && (
          <p className="text-gray-500 text-center py-4">
            Nessun ordine in questo periodo
          </p>
        )}
      </div>
    </div>
  );
}