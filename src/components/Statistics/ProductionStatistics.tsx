import React, { useState } from 'react';
import { TrendingUp, Package, Scale, ChefHat, Trash2 } from 'lucide-react';
import StatisticsCard from './StatisticsCard';
import DailyProductionList from './DailyProductionList';
import PeriodReport from './PeriodReport';
import { useProduction } from '../../hooks/useProduction';
import { groupProductionsByWeek, groupProductionsByMonth } from '../../utils/statisticsUtils';

export default function ProductionStatistics() {
  const { productions, clearHistory } = useProduction();
  const [selectedPeriod, setSelectedPeriod] = useState<'day' | 'week' | 'month'>('day');
  
  const sortedProductions = [...productions].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const weeklyProductions = groupProductionsByWeek(productions);
  const monthlyProductions = groupProductionsByMonth(productions);

  // Calculate summary statistics
  const totalBoxes = productions.reduce((sum, p) => sum + p.totals.boxes, 0);
  const totalBatches = productions.reduce((sum, p) => sum + p.totals.batches, 0);
  const lastWeekBoxes = sortedProductions
    .filter(p => new Date(p.date) >= new Date(Date.now() - 7 * 24 * 60 * 60 * 1000))
    .reduce((sum, p) => sum + p.totals.boxes, 0);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatisticsCard
          title="Cartoni Totali"
          value={totalBoxes}
          icon={<Package className="h-8 w-8 text-blue-500" />}
        />
        <StatisticsCard
          title="Pesate Totali"
          value={totalBatches}
          icon={<Scale className="h-8 w-8 text-green-500" />}
        />
        <StatisticsCard
          title="Media Giornaliera"
          value={Math.round(lastWeekBoxes / 7)}
          icon={<TrendingUp className="h-8 w-8 text-purple-500" />}
          subtitle="Cartoni nell'ultima settimana"
        />
      </div>

      <div className="flex justify-between items-center">
        <div className="flex space-x-4">
          <button
            onClick={() => setSelectedPeriod('day')}
            className={`px-4 py-2 rounded-md ${
              selectedPeriod === 'day'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            Giornaliero
          </button>
          <button
            onClick={() => setSelectedPeriod('week')}
            className={`px-4 py-2 rounded-md ${
              selectedPeriod === 'week'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            Settimanale
          </button>
          <button
            onClick={() => setSelectedPeriod('month')}
            className={`px-4 py-2 rounded-md ${
              selectedPeriod === 'month'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            Mensile
          </button>
        </div>
        
        <button
          onClick={clearHistory}
          className="flex items-center px-4 py-2 text-red-600 hover:bg-red-50 rounded-md"
        >
          <Trash2 className="h-5 w-5 mr-2" />
          Azzera Statistiche
        </button>
      </div>

      {selectedPeriod === 'day' && (
        <DailyProductionList productions={sortedProductions} />
      )}

      {selectedPeriod === 'week' && (
        <div className="space-y-8">
          {Object.entries(weeklyProductions).map(([weekKey, weekProductions]) => (
            <PeriodReport
              key={weekKey}
              title={`Settimana ${weekKey}`}
              productions={weekProductions}
            />
          ))}
        </div>
      )}

      {selectedPeriod === 'month' && (
        <div className="space-y-8">
          {Object.entries(monthlyProductions).map(([monthKey, monthProductions]) => (
            <PeriodReport
              key={monthKey}
              title={`Mese ${monthKey}`}
              productions={monthProductions}
            />
          ))}
        </div>
      )}
    </div>
  );
}