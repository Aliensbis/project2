import React, { useState } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';
import { Order, OrderItem } from '../../../types/Order';
import { products } from '../../../data/products';

interface EditOrderFormProps {
  order: Order;
  onSubmit: (updates: Partial<Order>) => void;
  onClose: () => void;
  isAdmin: boolean;
}

export default function EditOrderForm({
  order,
  onSubmit,
  onClose,
  isAdmin
}: EditOrderFormProps) {
  const [items, setItems] = useState<OrderItem[]>(order.items);
  const [notes, setNotes] = useState(order.notes || '');

  const handleAddProduct = () => {
    setItems(prev => [...prev, {
      productId: '',
      productName: '',
      boxes: 0,
      completed: 0
    }]);
  };

  const handleRemoveProduct = (index: number) => {
    setItems(prev => prev.filter((_, i) => i !== index));
  };

  const handleProductChange = (index: number, productId: string) => {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    setItems(prev => prev.map((item, i) => 
      i === index ? {
        ...item,
        productId,
        productName: product.name,
        boxes: item.boxes,
        completed: 0
      } : item
    ));
  };

  const handleQuantityChange = (index: number, boxes: number) => {
    setItems(prev => prev.map((item, i) => 
      i === index ? { ...item, boxes } : item
    ));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (items.some(item => !item.productId || item.boxes <= 0)) return;

    const totalPallets = Math.ceil(items.reduce((sum, item) => sum + item.boxes, 0) / 63);
    onSubmit({ items, notes, totalPallets });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Modifica Ordine</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
              <X className="h-6 w-6 text-gray-500" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900">Prodotti</h3>
                <button
                  type="button"
                  onClick={handleAddProduct}
                  className="flex items-center px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
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
                      onChange={(e) => handleProductChange(index, e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
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
                      onChange={(e) => handleQuantityChange(index, parseInt(e.target.value) || 0)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                      placeholder="Cartoni"
                      required
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveProduct(index)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              ))}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Note (opzionale)
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                rows={3}
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
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Salva Modifiche
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}