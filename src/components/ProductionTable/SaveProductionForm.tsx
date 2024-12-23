import React, { useState } from 'react';
import { Save } from 'lucide-react';
import { Product, ProductQuantity } from '../../types/Product';
import { ProductionEntry } from '../../types/Production';
import { calculateIngredientTotal, calculateFlourByType } from '../../utils/calculations';

interface SaveProductionFormProps {
  products: Product[];
  quantities: Record<string, ProductQuantity>;
  onSave: (production: ProductionEntry) => void;
}

export default function SaveProductionForm({ products, quantities, onSave }: SaveProductionFormProps) {
  const [note, setNote] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const totalBoxes = Object.values(quantities).reduce((sum, q) => sum + (q.boxes || 0), 0);
    const totalBatches = Object.values(quantities).reduce((sum, q) => sum + (q.batches || 0), 0);

    const production: ProductionEntry = {
      id: Date.now().toString(),
      date,
      note: note.trim() || undefined,
      quantities,
      totals: {
        boxes: totalBoxes,
        batches: totalBatches,
        ingredients: {
          flour: {
            total: calculateIngredientTotal(products, quantities, 'flour'),
            byType: calculateFlourByType(products, quantities),
          },
          eggs: calculateIngredientTotal(products, quantities, 'eggs'),
          sugar: calculateIngredientTotal(products, quantities, 'sugar'),
          salt: calculateIngredientTotal(products, quantities, 'salt'),
          yeast: calculateIngredientTotal(products, quantities, 'yeast'),
          margarine: calculateIngredientTotal(products, quantities, 'margarine'),
          e202: calculateIngredientTotal(products, quantities, 'e202'),
          oil: calculateIngredientTotal(products, quantities, 'oil'),
        },
      },
    };

    onSave(production);
    setNote('');
    alert('Produzione salvata con successo!');
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8 bg-white p-6 rounded-lg shadow-md">
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <div className="flex-1">
          <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
            Data Produzione
          </label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
        <div className="flex-1">
          <label htmlFor="note" className="block text-sm font-medium text-gray-700 mb-1">
            Note (opzionale)
          </label>
          <input
            type="text"
            id="note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Aggiungi una nota..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full md:w-auto px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 
                 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                 flex items-center justify-center gap-2"
      >
        <Save className="h-5 w-5" />
        Salva Produzione
      </button>
    </form>
  );
}