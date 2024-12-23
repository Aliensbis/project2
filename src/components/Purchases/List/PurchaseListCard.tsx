import React from 'react';
import { CheckCircle, XCircle, Clock, Trash2 } from 'lucide-react';
import { PurchaseList } from '../../../types/Purchase';
import { formatDate } from '../../../utils/dateUtils';
import PurchaseItemList from './PurchaseItemList';

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

  const getStatusInfo = () => {
    switch (list.status) {
      case 'completed':
        return { icon: CheckCircle, text: 'Completata', color: 'text-green-600' };
      case 'in-progress':
        return { icon: Clock, text: 'In Corso', color: 'text-blue-600' };
      default:
        return { icon: Clock, text: 'In Attesa', color: 'text-yellow-600' };
    }
  };

  const { icon: StatusIcon, text: statusText, color: statusColor } = getStatusInfo();

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{list.title}</h3>
          <p className="text-sm text-gray-500">{formatDate(list.createdAt)}</p>
        </div>
        <div className="flex items-center space-x-2">
          <span className={`flex items-center ${statusColor}`}>
            <StatusIcon className="h-5 w-5 mr-1" />
            {statusText}
          </span>
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

      <PurchaseItemList
        items={list.items}
        completedItems={list.completedItems}
        isAdmin={isAdmin}
        onUpdateItem={(itemId, completed) => onUpdateItem(list.id, itemId, completed)}
      />
    </div>
  );
}