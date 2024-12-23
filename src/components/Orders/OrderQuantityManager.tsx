import React from 'react';
import { OrderItem } from '../../types/Order';

interface OrderQuantityManagerProps {
  item: OrderItem;
  onQuantityUpdate: (completed: number) => void;
}

export default function OrderQuantityManager({ item, onQuantityUpdate }: OrderQuantityManagerProps) {
  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-gray-600">Cartoni Completati</span>
        <div className="flex items-center space-x-2">
          <input
            type="number"
            min="0"
            max={item.boxes}
            value={item.completed}
            onChange={(e) => {
              const value = parseInt(e.target.value);
              if (value >= 0 && value <= item.boxes) {
                onQuantityUpdate(value);
              }
            }}
            className="w-20 px-2 py-1 border border-gray-300 rounded text-center"
          />
          <span className="text-sm text-gray-500">/ {item.boxes}</span>
        </div>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-blue-600 h-2 rounded-full transition-all"
          style={{ width: `${(item.completed / item.boxes) * 100}%` }}
        />
      </div>
    </div>
  );
}