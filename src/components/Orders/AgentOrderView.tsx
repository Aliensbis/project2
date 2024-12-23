import React from 'react';
import { Order, Customer } from '../../types/Order';
import { products } from '../../data/products';

interface AgentOrderViewProps {
  order: Order;
  customer: Customer;
  onUpdateOrder: (orderId: string, updates: Partial<Order>) => void;
}

export default function AgentOrderView({ order, customer, onUpdateOrder }: AgentOrderViewProps) {
  const totalBoxes = order.items.reduce((sum, item) => sum + item.boxes, 0);
  const completedBoxes = order.items.reduce((sum, item) => sum + (item.completed || 0), 0);

  return (
    <div className="space-y-6">
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="font-medium text-gray-900 mb-4">Dettagli Ordine</h3>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-sm text-gray-600">Stato</p>
            <p className="font-medium capitalize">{order.status}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Avanzamento</p>
            <p className="font-medium">{completedBoxes} / {totalBoxes} cartoni</p>
          </div>
        </div>

        {order.notes && (
          <div className="mt-4 p-3 bg-gray-50 rounded">
            <p className="text-sm text-gray-600">Note</p>
            <p className="text-sm">{order.notes}</p>
          </div>
        )}
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="font-medium text-gray-900 mb-4">Prodotti</h3>
        <div className="space-y-4">
          {order.items.map(item => {
            const product = products.find(p => p.id === item.productId);
            return (
              <div key={item.productId} className="flex justify-between items-center py-2 border-b last:border-0">
                <div>
                  <p className="font-medium">{product?.name}</p>
                  <p className="text-sm text-gray-500">{item.boxes} cartoni</p>
                </div>
                <div className="text-sm">
                  <span className="text-gray-500">Completati: </span>
                  <span className="font-medium">{item.completed}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}