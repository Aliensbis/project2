import React from 'react';
import { Minus } from 'lucide-react';
import { PurchaseCategory } from '../../../types/Purchase';

interface PurchaseItemFormProps {
  name: string;
  category: PurchaseCategory;
  quantity: number;
  unit: string;
  onUpdate: (field: string, value: any) => void;
  onRemove: () => void;
}

export default function PurchaseItemForm({
  name,
  category,
  quantity,
  unit,
  onUpdate,
  onRemove
}: PurchaseItemFormProps) {
  return (
    <div className="grid grid-cols-12 gap-4 items-start">
      <div className="col-span-4">
        <input
          type="text"
          value={name}
          onChange={(e) => onUpdate('name', e.target.value)}
          placeholder="Nome articolo"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500"
          required
        />
      </div>

      <div className="col-span-3">
        <select
          value={category}
          onChange={(e) => onUpdate('category', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500"
        >
          <option value="raw-materials">Materie Prime</option>
          <option value="warehouse">Magazzino</option>
          <option value="cleaning">Pulizia</option>
          <option value="other">Altro</option>
        </select>
      </div>

      <div className="col-span-2">
        <input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => onUpdate('quantity', parseInt(e.target.value))}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500"
          required
        />
      </div>

      <div className="col-span-2">
        <input
          type="text"
          value={unit}
          onChange={(e) => onUpdate('unit', e.target.value)}
          placeholder="Unità"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500"
          required
        />
      </div>

      <div className="col-span-1">
        <button
          type="button"
          onClick={onRemove}
          className="p-2 text-red-600 hover:bg-red-50 rounded-full"
        >
          <Minus className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}