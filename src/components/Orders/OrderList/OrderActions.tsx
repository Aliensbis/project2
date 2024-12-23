import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import { Order } from '../../../types/Order';

interface OrderActionsProps {
  order: Order;
  onEdit: () => void;
  onDelete: () => void;
  isProduction: boolean;
}

export default function OrderActions({ order, onEdit, onDelete, isProduction }: OrderActionsProps) {
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('Sei sicuro di voler eliminare questo ordine? Questa azione non può essere annullata.')) {
      onDelete();
    }
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit();
  };

  if (!isProduction) return null;

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={handleEdit}
        className="p-1 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded"
        title="Modifica ordine"
      >
        <Edit2 className="h-4 w-4" />
      </button>
      <button
        onClick={handleDelete}
        className="p-1 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded"
        title="Elimina ordine"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  );
}