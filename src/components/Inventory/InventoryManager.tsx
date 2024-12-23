import React, { useState } from 'react';
import { Package, ArrowDownCircle, ArrowUpCircle } from 'lucide-react';
import { products } from '../../data/products';
import { useInventory } from '../../hooks/useInventory';

export default function InventoryManager() {
  const { getCurrentStock, addMovement } = useInventory();
  const [selectedProduct, setSelectedProduct] = useState('');
  const [quantity, setQuantity] = useState('');
  const [type, setType] = useState<'in' | 'out'>('in');
  const [note, setNote] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProduct || !quantity) return;

    const numQuantity = parseInt(quantity);
    if (isNaN(numQuantity) || numQuantity <= 0) return;

    // Verifica se c'è abbastanza stock per l'uscita
    if (type === 'out') {
      const currentStock = getCurrentStock(selectedProduct);
      if (numQuantity > currentStock) {
        alert('Quantità non disponibile in magazzino!');
        return;
      }
    }

    addMovement({
      date: new Date().toISOString(),
      type,
      productId: selectedProduct,
      quantity: numQuantity,
      note: note.trim() || undefined
    });

    setQuantity('');
    setNote('');
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center mb-6">
        <Package className="h-6 w-6 text-blue-600 mr-2" />
        <h2 className="text-xl font-semibold text-gray-900">Gestione Magazzino</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Movimenti</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Prodotto
              </label>
              <select
                value={selectedProduct}
                onChange={(e) => setSelectedProduct(e.target.value)}
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

            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => setType('in')}
                className={`flex-1 flex items-center justify-center px-4 py-2 rounded-md ${
                  type === 'in'
                    ? 'bg-green-100 text-green-800 border-2 border-green-500'
                    : 'bg-gray-100 text-gray-800 border border-gray-300'
                }`}
              >
                <ArrowDownCircle className="h-5 w-5 mr-2" />
                Entrata
              </button>
              <button
                type="button"
                onClick={() => setType('out')}
                className={`flex-1 flex items-center justify-center px-4 py-2 rounded-md ${
                  type === 'out'
                    ? 'bg-red-100 text-red-800 border-2 border-red-500'
                    : 'bg-gray-100 text-gray-800 border border-gray-300'
                }`}
              >
                <ArrowUpCircle className="h-5 w-5 mr-2" />
                Uscita
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Quantità (cartoni)
              </label>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Note (opzionale)
              </label>
              <input
                type="text"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                placeholder="Aggiungi una nota..."
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Registra Movimento
            </button>
          </form>
        </div>

        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Giacenze Attuali</h3>
          <div className="bg-gray-50 rounded-lg p-4 space-y-2">
            {products.map(product => {
              const stock = getCurrentStock(product.id);
              return (
                <div
                  key={product.id}
                  className="flex justify-between items-center py-2 px-3 bg-white rounded-md shadow-sm"
                >
                  <span className="font-medium text-gray-900">{product.name}</span>
                  <span className={`font-semibold ${
                    stock === 0 ? 'text-red-600' :
                    stock < 10 ? 'text-yellow-600' : 'text-green-600'
                  }`}>
                    {stock} cartoni
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}