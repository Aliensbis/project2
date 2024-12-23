import React from 'react';
import { formatDate } from '../../utils/dateUtils';

interface Lot {
  number: string;
  productionDate: string;
  boxes: number;
}

interface OrderLotViewerProps {
  lots: Lot[];
}

export default function OrderLotViewer({ lots }: OrderLotViewerProps) {
  return (
    <div className="mt-4">
      <h4 className="text-sm font-medium text-gray-700 mb-2">Lotti di Produzione</h4>
      <div className="space-y-2">
        {lots.map(lot => (
          <div key={lot.number} className="bg-gray-50 px-3 py-2 rounded text-sm">
            <div className="flex justify-between items-center">
              <div>
                <span className="font-medium">Lotto: {lot.number}</span>
                <span className="text-gray-500 mx-2">|</span>
                <span className="text-gray-500">
                  Data: {formatDate(lot.productionDate)}
                </span>
              </div>
              <span className="text-blue-600 font-medium">
                {lot.boxes} cartoni
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}