import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';
import { PurchaseItem } from '../../../types/Purchase';
import { getCategoryLabel } from '../../../utils/purchaseUtils';

interface PurchaseItemListProps {
  items: PurchaseItem[];
  completedItems: string[];
  isAdmin: boolean;
  onUpdateItem: (itemId: string, completed: boolean) => void;
}

export default function PurchaseItemList({
  items,
  completedItems,
  isAdmin,
  onUpdateItem
}: PurchaseItemListProps) {
  return (
    <div className="space-y-3">
      {items.map(item => {
        const isCompleted = completedItems.includes(item.id);
        return (
          <div
            key={item.id}
            className="flex items-center justify-between p-2 bg-gray-50 rounded"
          >
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <p className={`font-medium ${isCompleted ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
                  {item.name}
                </p>
                <span className="text-sm text-gray-500">
                  {getCategoryLabel(item.category)}
                </span>
              </div>
              <div className="flex items-center text-sm text-gray-500 mt-1">
                <span>{item.quantity} {item.unit}</span>
                {item.urgent && (
                  <span className="ml-2 px-2 py-0.5 bg-red-100 text-red-800 rounded-full text-xs">
                    Urgente
                  </span>
                )}
              </div>
              {item.notes && (
                <p className="text-sm text-gray-500 mt-1">
                  Note: {item.notes}
                </p>
              )}
            </div>
            {isAdmin && (
              <button
                onClick={() => onUpdateItem(item.id, !isCompleted)}
                className={`p-1 rounded ml-4 ${
                  isCompleted
                    ? 'text-gray-400 hover:text-gray-600'
                    : 'text-purple-600 hover:text-purple-800'
                }`}
              >
                {isCompleted ? (
                  <XCircle className="h-5 w-5" />
                ) : (
                  <CheckCircle className="h-5 w-5" />
                )}
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}