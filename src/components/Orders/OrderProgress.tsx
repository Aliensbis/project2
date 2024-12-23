import React from 'react';
import { Order } from '../../types/Order';
import { products } from '../../data/products';

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

  const handleStatusChange = (newStatus: Order['status']) => {
    if (!canUpdateStatus) return;
    onUpdateOrder(order.id, { status: newStatus });
  };

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

      {canUpdateStatus && (
        <div className="flex space-x-2">
          {order.status === 'pending' && (
            <button
              onClick={() => handleStatusChange('in-progress')}
              className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Avvia Lavorazione
            </button>
          )}
          {order.status === 'in-progress' && completedBoxes === totalBoxes && (
            <button
              onClick={() => handleStatusChange('completed')}
              className="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700"
            >
              Segna come Completato
            </button>
          )}
          {order.status === 'completed' && (
            <button
              onClick={() => handleStatusChange('shipped')}
              className="px-3 py-1 text-sm bg-purple-600 text-white rounded hover:bg-purple-700"
            >
              Segna come Spedito
            </button>
          )}
        </div>
      )}

      <div className="space-y-4">
        {order.items.map((item) => {
          const product = products.find(p => p.id === item.productId);
          if (!product) return null;

          return (
            <div key={item.productId} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-700">{product.name}</span>
                <div className="flex items-center space-x-2">
                  {canManageLots ? (
                    <input
                      type="number"
                      value={item.completed}
                      onChange={(e) => {
                        const value = parseInt(e.target.value);
                        if (value >= 0 && value <= item.boxes) {
                          onUpdateOrder(order.id, {
                            items: order.items.map(i => 
                              i.productId === item.productId 
                                ? { ...i, completed: value }
                                : i
                            )
                          });
                        }
                      }}
                      className="w-20 px-2 py-1 text-sm border border-gray-300 rounded"
                      min="0"
                      max={item.boxes}
                    />
                  ) : (
                    <span className="text-sm text-gray-500">
                      {item.completed}
                    </span>
                  )}
                  <span className="text-sm text-gray-500">
                    / {item.boxes} cartoni
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