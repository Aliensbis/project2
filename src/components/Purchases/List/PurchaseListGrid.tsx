import React from 'react';
import { PurchaseList } from '../../../types/Purchase';
import PurchaseListCard from './PurchaseListCard';

interface PurchaseListGridProps {
  lists: PurchaseList[];
  isAdmin: boolean;
  onUpdateItem: (listId: string, itemId: string, completed: boolean) => void;
  onDelete: (listId: string) => void;
}

export default function PurchaseListGrid({
  lists,
  isAdmin,
  onUpdateItem,
  onDelete
}: PurchaseListGridProps) {
  if (lists.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg shadow-md">
        <p className="text-gray-500">Nessuna lista acquisti trovata</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {lists.map(list => (
        <PurchaseListCard
          key={list.id}
          list={list}
          isAdmin={isAdmin}
          onUpdateItem={onUpdateItem}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}