import React from 'react';
import { ProductionEntry } from '../../types/Production';
import { formatDate } from '../../utils/dateUtils';
import { ChevronDown, ChevronRight } from 'lucide-react';

interface DailyProductionListProps {
  productions: ProductionEntry[];
}

export default function DailyProductionList({ productions }: DailyProductionListProps) {
  const [expandedDays, setExpandedDays] = React.useState<string[]>([]);

  const toggleDay = (date: string) => {
    setExpandedDays(prev => 
      prev.includes(date) 
        ? prev.filter(d => d !== date)
        : [...prev, date]
    );
  };

  const sortedProductions = [...productions].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Produzioni Giornaliere</h3>
      </div>
      <div className="divide-y divide-gray-200">
        {sortedProductions.map((production) => (
          <div key={production.id} className="p-4">
            <div 
              className="flex items-center justify-between cursor-pointer"
              onClick={() => toggleDay(production.date)}
            >
              <div className="flex items-center space-x-3">
                {expandedDays.includes(production.date) 
                  ? <ChevronDown className="h-5 w-5 text-gray-500" />
                  : <ChevronRight className="h-5 w-5 text-gray-500" />
                }
                <h4 className="text-lg font-medium text-gray-900">
                  {formatDate(production.date)}
                </h4>
              </div>
              <div className="text-sm text-gray-500">
                {production.totals.boxes} cartoni - {production.totals.batches} pesate
              </div>
            </div>

            {expandedDays.includes(production.date) && (
              <div className="mt-4 pl-8">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-medium text-gray-700 mb-2">Prodotti</h5>
                      {Object.entries(production.quantities).map(([productId, quantity]) => (
                        quantity.boxes > 0 && (
                          <div key={productId} className="flex justify-between text-sm">
                            <span>{productId}</span>
                            <span>{quantity.boxes} cartoni ({quantity.batches} pesate)</span>
                          </div>
                        )
                      ))}
                    </div>
                    <div>
                      <h5 className="font-medium text-gray-700 mb-2">Ingredienti Utilizzati</h5>
                      <div className="space-y-1 text-sm">
                        {Object.entries(production.totals.ingredients.flour.byType).map(([type, amount]) => (
                          <div key={type} className="flex justify-between">
                            <span>Farina {type}</span>
                            <span>{amount.toFixed(2)} kg</span>
                          </div>
                        ))}
                        <div className="flex justify-between">
                          <span>Uova</span>
                          <span>{production.totals.ingredients.eggs.toFixed(2)} kg</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Zucchero</span>
                          <span>{production.totals.ingredients.sugar.toFixed(2)} kg</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Sale</span>
                          <span>{production.totals.ingredients.salt.toFixed(2)} kg</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Lievito</span>
                          <span>{production.totals.ingredients.yeast.toFixed(2)} kg</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Margarina</span>
                          <span>{production.totals.ingredients.margarine.toFixed(2)} kg</span>
                        </div>
                        <div className="flex justify-between">
                          <span>E202</span>
                          <span>{production.totals.ingredients.e202.toFixed(3)} kg</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Olio</span>
                          <span>{production.totals.ingredients.oil.toFixed(2)} kg</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {production.note && (
                    <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded">
                      <span className="font-medium">Note:</span> {production.note}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}