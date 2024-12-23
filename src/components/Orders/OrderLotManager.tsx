import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';

interface Lot {
  number: string;
  productionDate: string;
  boxes: number;
}

interface OrderLotManagerProps {
  productId: string;
  productName: string;
  lots: Lot[];
  onUpdateLots: (lots: Lot[]) => void;
}

export default function OrderLotManager({
  productId,
  productName,
  lots = [],
  onUpdateLots
}: OrderLotManagerProps) {
  const [showAddLot, setShowAddLot] = useState(false);
  const [newLot, setNewLot] = useState<Lot>({
    number: '',
    productionDate: '',
    boxes: 0
  });

  const addLot = () => {
    if (!newLot.number || !newLot.productionDate || newLot.boxes <= 0) return;
    
    const updatedLots = [...lots, newLot];
    onUpdateLots(updatedLots);
    setNewLot({ number: '', productionDate: '', boxes: 0 });
    setShowAddLot(false);
  };

  const removeLot = (lotNumber: string) => {
    const updatedLots = lots.filter(lot => lot.number !== lotNumber);
    onUpdateLots(updatedLots);
  };

  return (
    <div className="mt-4">
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-sm font-medium text-gray-700">Lotti di Produzione</h4>
        <button
          onClick={() => setShowAddLot(true)}
          className="text-blue-600 hover:text-blue-700 text-sm flex items-center"
        >
          <Plus className="h-4 w-4 mr-1" />
          Aggiungi Lotto
        </button>
      </div>

      {showAddLot && (
        <div className="bg-gray-50 p-3 rounded mb-3">
          <div className="grid grid-cols-3 gap-3">
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
            <input
              type="number"
              min="1"
              placeholder="Cartoni"
              value={newLot.boxes || ''}
              onChange={(e) => setNewLot(prev => ({ ...prev, boxes: parseInt(e.target.value) || 0 }))}
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
              className="px-2 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Aggiungi
            </button>
          </div>
        </div>
      )}

      <div className="space-y-2">
        {lots.map(lot => (
          <div key={lot.number} className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded text-sm">
            <div>
              <span className="font-medium">Lotto: {lot.number}</span>
              <span className="text-gray-500 mx-2">|</span>
              <span className="text-gray-500">
                Data: {new Date(lot.productionDate).toLocaleDateString()}
              </span>
              <span className="text-gray-500 mx-2">|</span>
              <span className="text-blue-600 font-medium">
                {lot.boxes} cartoni
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