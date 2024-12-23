import React, { useState } from 'react';
import { X, Plus, Minus } from 'lucide-react';
import { PurchaseItem, PurchaseCategory } from '../../types/Purchase';

interface NewPurchaseListProps {
  onSubmit: (title: string, items: PurchaseItem[]) => void;
  onClose: () => void;
}

export default function NewPurchaseList({ onSubmit, onClose }: NewPurchaseListProps) {
  const [title, setTitle] = useState('');
  const [items, setItems] = useState<PurchaseItem[]>([]);

  const addItem = () => {
    const newItem: PurchaseItem = {
      id: Date.now().toString(),
      name: '',
      category: 'raw-materials',
      quantity: 1,
      unit: 'pz',
      urgent: false
    };
    setItems(prev => [...prev, newItem]);
  };

  const updateItem = (index: number, updates: Partial<PurchaseItem>) => {
    setItems(prev => prev.map((item, i) => 
      i === index ? { ...item, ...updates } : item
    ));
  };

  const removeItem = (index: number) => {
    setItems(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || items.length === 0) return;
    onSubmit(title, items);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Nuova Lista Acquisti</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
              <X className="h-6 w-6 text-gray-500" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Titolo Lista
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900">Articoli</h3>
                <button
                  type="button"
                  onClick={addItem}
                  className="flex items-center px-3 py-1 text-sm bg-purple-600 text-white rounded hover:bg-purple-700"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Aggiungi Articolo
                </button>
              </div>

              {items.map((item, index) => (
                <div key={item.id} className="grid grid-cols-12 gap-4 items-start">
                  <div className="col-span-4">
                    <input
                      type="text"
                      value={item.name}
                      onChange={(e) => updateItem(index, { name: e.target.value })}
                      placeholder="Nome articolo"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500"
                      required
                    />
                  </div>

                  <div className="col-span-3">
                    <select
                      value={item.category}
                      onChange={(e) => updateItem(index, { category: e.target.value as PurchaseCategory })}
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
                      value={item.quantity}
                      onChange={(e) => updateItem(index, { quantity: parseInt(e.target.value) })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500"
                      required
                    />
                  </div>

                  <div className="col-span-2">
                    <input
                      type="text"
                      value={item.unit}
                      onChange={(e) => updateItem(index, { unit: e.target.value })}
                      placeholder="Unità"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500"
                      required
                    />
                  </div>

                  <div className="col-span-1">
                    <button
                      type="button"
                      onClick={() => removeItem(index)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                    >
                      <Minus className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
              >
                Annulla
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
              >
                Salva Lista
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}