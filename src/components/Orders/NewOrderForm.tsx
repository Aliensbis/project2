import React, { useState } from 'react';
import { X, Plus, Minus } from 'lucide-react';
import { Customer, Order } from '../../types/Order';
import { products } from '../../data/products';

interface NewOrderFormProps {
  customers: Customer[];
  onSubmit: (order: Omit<Order, 'id'>) => void;
  onClose: () => void;
}

export default function NewOrderForm({ customers, onSubmit, onClose }: NewOrderFormProps) {
  const [customerId, setCustomerId] = useState('');
  const [items, setItems] = useState<{ productId: string; boxes: number }[]>([]);
  const [notes, setNotes] = useState('');

  const calculatePallets = () => {
    const totalBoxes = items.reduce((sum, item) => sum + item.boxes, 0);
    return Math.ceil(totalBoxes / 63);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerId || items.length === 0) return;

    const order: Omit<Order, 'id'> = {
      customerId,
      date: new Date().toISOString(),
      items: items.map(item => ({ ...item, completed: 0 })),
      status: 'pending',
      totalPallets: calculatePallets(),
      notes: notes.trim() || undefined,
    };

    onSubmit(order);
  };

  const addItem = () => {
    setItems(prev => [...prev, { productId: '', boxes: 0 }]);
  };

  const removeItem = (index: number) => {
    setItems(prev => prev.filter((_, i) => i !== index));
  };

  const updateItem = (index: number, field: 'productId' | 'boxes', value: string | number) => {
    setItems(prev => prev.map((item, i) => 
      i === index ? { ...item, [field]: value } : item
    ));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Nuovo Ordine</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <X className="h-6 w-6 text-gray-500" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Cliente
              </label>
              <select
                value={customerId}
                onChange={(e) => setCustomerId(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                required
              >
                <option value="">Seleziona cliente</option>
                {customers.map(customer => (
                  <option key={customer.id} value={customer.id}>
                    {customer.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900">Prodotti</h3>
                <button
                  type="button"
                  onClick={addItem}
                  className="flex items-center px-3 py-1 text-sm bg-indigo-600 text-white rounded hover:bg-indigo-700"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Aggiungi Prodotto
                </button>
              </div>

              {items.map((item, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div className="flex-1">
                    <select
                      value={item.productId}
                      onChange={(e) => updateItem(index, 'productId', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                      required
                    >
                      <option value="">Seleziona prodotto</option>
                      {products.map(product => (
                        <option key={product.id} value={product.id}>
                          {product.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="w-32">
                    <input
                      type="number"
                      min="1"
                      value={item.boxes || ''}
                      onChange={(e) => updateItem(index, 'boxes', parseInt(e.target.value) || 0)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                      placeholder="Cartoni"
                      required
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeItem(index)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                  >
                    <Minus className="h-5 w-5" />
                  </button>
                </div>
              ))}

              {items.length > 0 && (
                <div className="text-sm text-gray-600">
                  Totale pedane: {calculatePallets()}
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Note (opzionale)
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                rows={3}
                placeholder="Aggiungi eventuali note..."
              />
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
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                Crea Ordine
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}