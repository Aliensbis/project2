import React from 'react';
import { Plus, Filter } from 'lucide-react';
import { PurchaseCategory } from '../../../types/Purchase';

interface PurchaseListHeaderProps {
  onNewList: () => void;
  selectedCategory: PurchaseCategory | 'all';
  onCategoryChange: (category: PurchaseCategory | 'all') => void;
  showNewButton: boolean;
}

export default function PurchaseListHeader({
  onNewList,
  selectedCategory,
  onCategoryChange,
  showNewButton
}: PurchaseListHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
      <div className="flex items-center space-x-2">
        <Filter className="h-5 w-5 text-gray-400" />
        <select
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value as PurchaseCategory | 'all')}
          className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500"
        >
          <option value="all">Tutte le categorie</option>
          <option value="raw-materials">Materie Prime Produzione</option>
          <option value="warehouse">Materiale Magazzino</option>
          <option value="cleaning">Prodotti per la Pulizia</option>
          <option value="other">Altro</option>
        </select>
      </div>

      {showNewButton && (
        <button
          onClick={onNewList}
          className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
        >
          <Plus className="h-5 w-5 mr-2" />
          Nuova Lista
        </button>
      )}
    </div>
  );
}