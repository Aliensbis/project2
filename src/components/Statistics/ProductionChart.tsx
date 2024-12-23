import React from 'react';
import { DailyProduction } from '../../types/Statistics';

interface ProductionChartProps {
  data: DailyProduction[];
  type: 'boxes' | 'batches';
}

export default function ProductionChart({ data, type }: ProductionChartProps) {
  const values = data.map(day => type === 'boxes' ? day.totalBoxes : day.totalBatches);
  const max = Math.max(...values, 1);
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">
        {type === 'boxes' ? 'Cartoni Prodotti' : 'Pesate Effettuate'} - Ultimi 7 giorni
      </h3>
      <div className="flex items-end space-x-2 h-48">
        {values.map((value, index) => (
          <div
            key={index}
            className="flex-1 bg-blue-500 hover:bg-blue-600 transition-all rounded-t"
            style={{ height: `${(value / max) * 100}%` }}
          >
            <div className="transform -rotate-90 translate-y-6 text-white text-sm whitespace-nowrap">
              {value}
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-4 text-sm text-gray-500">
        {data.map((day, index) => (
          <div key={index}>
            {new Date(day.date).toLocaleDateString('it-IT', { weekday: 'short' })}
          </div>
        ))}
      </div>
    </div>
  );
}