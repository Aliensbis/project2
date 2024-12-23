import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { ProductionLot } from '../../../types/Order';

interface OrderLotManagerProps {
  productId: string;
  productName: string;
  lots: ProductionLot[];
  onUpdateLots: (lots: ProductionLot[]) => void;
}

export default function OrderLotManager({
  productId,
  productName,
  lots = [],
  onUpdateLots
}: OrderLotManagerProps) {
  const [showAddLot, setShowAddLot] = useState(false);
  const [newLot, setNewLot] = useState({ number: '', productionDate: '' });

  const addLot = () => {
    if (!newLot.number || !newLot.productionDate) return;
    
    const updatedLots = [...lots, newLot];
    onUpdateLots(updatedLots);
    setNewLot({ number: '', productionDate: '' });
    setShowAddLot(false);
  };

  const removeLot = (lotNumber: string) => {
    const updatedLots = lots.filter(lot => lot.number !== lotNumber);
    onUpdateLots(updatedLots);
  };

  return (
    <div className="mt-2 bg-gray-50 p-3 rounded-md">
      <div className="flex items-center justify-between mb-2">
        <h5 className="text-sm font-medium text-gray-700">{productName} - Lotti</h5>
        <button
          onClick={() => setShowAddLot(true)}
          className="text-indigo-600 hover:text-indigo-700 text-sm flex items-center"
        >
          <Plus className="h-4 w-4 mr-1" />
          Aggiungi Lotto
        </button>
      </div>

      {showAddLot && (
        <div className="bg-white p-3 rounded-md mb-3 shadow-sm">
          <div className="grid grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="Numero Lotto"
              value={newLot.number}
              onChange={(e) => setNewLot(prev => ({ ...prev, number: e.target.value }))}
              className="px-2 py-1 border rounded text-sm"
            />
            <input
              type="date"
              value={newLot.productionDate}
              onChange={(e) => setNewLot(prev => ({ ...prev, productionDate: e.target.value }))}
              className="px-2 py-1 border rounded text-sm"
            />
          </div>
          <div className="flex justify-end mt-2 space-x-2">
            <button
              onClick={() => setShowAddLot(false)}
              className="px-2 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded"
            >
              Annulla
            </button>
            <button
              onClick={addLot}
              className="px-2 py-1 text-sm bg-indigo-600 text-white rounded hover:bg-indigo-700"
            >
              Salva
            </button>
          </div>
        </div>
      )}

      <div className="space-y-2">
        {lots.map(lot => (
          <div key={lot.number} className="flex items-center justify-between bg-white px-3 py-2 rounded text-sm">
            <div>
              <span className="font-medium">Lotto: {lot.number}</span>
              <span className="text-gray-500 ml-2">
                Data: {new Date(lot.productionDate).toLocaleDateString()}
              </span>
            </div>
            <button
              onClick={() => removeLot(lot.number)}
              className="text-red-600 hover:text-red-700"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}