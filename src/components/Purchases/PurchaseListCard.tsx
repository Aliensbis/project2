import React from 'react';
import { CheckCircle, XCircle, Clock, Trash2 } from 'lucide-react';
import { PurchaseList } from '../../types/Purchase';
import { formatDate } from '../../utils/dateUtils';

interface PurchaseListCardProps {
  list: PurchaseList;
  isAdmin: boolean;
  onUpdateItem: (listId: string, itemId: string, completed: boolean) => void;
  onDelete: (listId: string) => void;
}

export default function PurchaseListCard({
  list,
  isAdmin,
  onUpdateItem,
  onDelete
}: PurchaseListCardProps) {
  const progress = (list.completedItems.length / list.items.length) * 100;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{list.title}</h3>
          <p className="text-sm text-gray-500">{formatDate(list.createdAt)}</p>
        </div>
        <div className="flex items-center space-x-2">
          {list.status === 'completed' ? (
            <span className="flex items-center text-green-600">
              <CheckCircle className="h-5 w-5 mr-1" />
              Completata
            </span>
          ) : list.status === 'in-progress' ? (
            <span className="flex items-center text-blue-600">
              <Clock className="h-5 w-5 mr-1" />
              In Corso
            </span>
          ) : (
            <span className="flex items-center text-yellow-600">
              <Clock className="h-5 w-5 mr-1" />
              In Attesa
            </span>
          )}
          <button
            onClick={() => onDelete(list.id)}
            className="p-1 text-red-600 hover:bg-red-50 rounded"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="mb-4">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-purple-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-sm text-gray-600 mt-1">
          {list.completedItems.length} di {list.items.length} articoli completati
        </p>
      </div>

      <div className="space-y-3">
        {list.items.map(item => {
          const isCompleted = list.completedItems.includes(item.id);
          return (
            <div
              key={item.id}
              className="flex items-center justify-between p-2 bg-gray-50 rounded"
            >
              <div className="flex-1">
                <p className={`font-medium ${isCompleted ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
                  {item.name}
                </p>
                <p className="text-sm text-gray-500">
                  {item.quantity} {item.unit}
                </p>
              </div>
              {isAdmin && (
                <button
                  onClick={() => onUpdateItem(list.id, item.id, !isCompleted)}
                  className={`p-1 rounded ${
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
    </div>
  );
}