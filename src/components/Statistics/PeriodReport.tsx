import React from 'react';
import { ProductionEntry } from '../../types/Production';
import { calculatePeriodTotals } from '../../utils/statisticsUtils';

interface PeriodReportProps {
  title: string;
  productions: ProductionEntry[];
}

export default function PeriodReport({ title, productions }: PeriodReportProps) {
  const totals = calculatePeriodTotals(productions);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">Produzione</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Cartoni Totali</span>
                <span className="font-semibold">{totals.boxes}</span>
              </div>
              <div className="flex justify-between">
                <span>Pesate Totali</span>
                <span className="font-semibold">{totals.batches}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="font-medium text-green-900 mb-2">Farina per Tipo</h4>
            <div className="space-y-2">
              {Object.entries(totals.ingredients.flour.byType).map(([type, amount]) => (
                <div key={type} className="flex justify-between">
                  <span>{type}</span>
                  <span className="font-semibold">
                    {amount.toFixed(1)} kg ({Math.ceil(amount / 25)} sacchi)
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-yellow-50 p-4 rounded-lg">
            <h4 className="font-medium text-yellow-900 mb-2">Altri Ingredienti</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Uova</span>
                <span className="font-semibold">
                  {totals.ingredients.eggs.toFixed(1)} kg ({Math.ceil(totals.ingredients.eggs / 20)} cartoni)
                </span>
              </div>
              <div className="flex justify-between">
                <span>Zucchero</span>
                <span className="font-semibold">{totals.ingredients.sugar.toFixed(1)} kg</span>
              </div>
              <div className="flex justify-between">
                <span>Sale</span>
                <span className="font-semibold">{totals.ingredients.salt.toFixed(1)} kg</span>
              </div>
              <div className="flex justify-between">
                <span>Lievito</span>
                <span className="font-semibold">{totals.ingredients.yeast.toFixed(1)} kg</span>
              </div>
              <div className="flex justify-between">
                <span>Margarina</span>
                <span className="font-semibold">{totals.ingredients.margarine.toFixed(1)} kg</span>
              </div>
              <div className="flex justify-between">
                <span>E202</span>
                <span className="font-semibold">{totals.ingredients.e202.toFixed(3)} kg</span>
              </div>
              <div className="flex justify-between">
                <span>Olio</span>
                <span className="font-semibold">{totals.ingredients.oil.toFixed(1)} kg</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}