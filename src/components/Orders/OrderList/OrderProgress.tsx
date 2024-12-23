import React from 'react';
import { Order } from '../../../types/Order';
import { products } from '../../../data/products';

interface OrderProgressProps {
  order: Order;
  completedBoxes: number;
  totalBoxes: number;
  onUpdateOrder: (orderId: string, updates: Partial<Order>) => void;
  canUpdateStatus: boolean;
  canManageLots: boolean;
}

export default function OrderProgress({
  order,
  completedBoxes,
  totalBoxes,
  onUpdateOrder,
  canUpdateStatus,
  canManageLots
}: OrderProgressProps) {
  const progress = (completedBoxes / totalBoxes) * 100;

  return (
    <div className="space-y-4">
      <div>
        <div className="flex justify-between text-sm text-gray-600 mb-1">
          <span>Avanzamento</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-sm text-gray-600 mt-1">
          {completedBoxes} su {totalBoxes} cartoni completati
        </p>
      </div>

      <div className="space-y-4">
        {order.items.map((item) => {
          const product = products.find(p => p.id === item.productId);
          if (!product) return null;

          return (
            <div key={item.productId} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-700">{product.name}</span>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">
                    {item.completed} / {item.boxes} cartoni
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}