import React, { useState } from 'react';
import { Package, ArrowDownCircle, ArrowUpCircle, History } from 'lucide-react';
import { products } from '../data/products';
import { useInventory } from '../hooks/useInventory';
import { formatDate } from '../utils/dateUtils';

export default function InventoryPage() {
  const { getCurrentStock, addMovement, movements } = useInventory();
  const [selectedProduct, setSelectedProduct] = useState('');
  const [quantity, setQuantity] = useState('');
  const [type, setType] = useState<'in' | 'out'>('in');
  const [note, setNote] = useState('');
  const [showHistory, setShowHistory] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProduct || !quantity) return;

    const numQuantity = parseInt(quantity);
    if (isNaN(numQuantity) || numQuantity <= 0) return;

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

  const getProductName = (id: string) => {
    return products.find(p => p.id === id)?.name || id;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <Package className="h-8 w-8 text-purple-600 mr-2" />
            <h1 className="text-2xl font-bold text-gray-900">Gestione Magazzino</h1>
          </div>
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="flex items-center px-4 py-2 text-purple-600 hover:bg-purple-50 rounded-md"
          >
            <History className="h-5 w-5 mr-2" />
            {showHistory ? 'Nascondi Storico' : 'Mostra Storico'}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Nuovo Movimento</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Prodotto
                  </label>
                  <select
                    value={selectedProduct}
                    onChange={(e) => setSelectedProduct(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500"
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500"
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500"
                    placeholder="Aggiungi una nota..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                >
                  Registra Movimento
                </button>
              </form>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Giacenze Attuali</h2>
              <div className="space-y-2">
                {products.map(product => {
                  const stock = getCurrentStock(product.id);
                  return (
                    <div
                      key={product.id}
                      className="flex justify-between items-center py-2 px-3 bg-gray-50 rounded-md"
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

          {showHistory && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Storico Movimenti</h2>
              <div className="space-y-4">
                {[...movements].reverse().map(movement => (
                  <div
                    key={movement.id}
                    className={`p-4 rounded-lg border ${
                      movement.type === 'in'
                        ? 'border-green-200 bg-green-50'
                        : 'border-red-200 bg-red-50'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-gray-900">
                          {getProductName(movement.productId)}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {formatDate(movement.date)}
                        </p>
                      </div>
                      <span className={`font-semibold ${
                        movement.type === 'in' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {movement.type === 'in' ? '+' : '-'}{movement.quantity} cartoni
                      </span>
                    </div>
                    {movement.note && (
                      <p className="mt-2 text-sm text-gray-600">
                        Note: {movement.note}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}