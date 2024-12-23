import React from 'react';
import { Package, TrendingUp, Award } from 'lucide-react';
import { CustomerAnalytics } from '../../utils/customerAnalytics';

interface CustomerMetricsProps {
  stats: CustomerAnalytics;
}

export default function CustomerMetrics({ stats }: CustomerMetricsProps) {
  return (
    <>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-medium">Ordini Settimanali</h3>
          <Package className="h-5 w-5 text-blue-500" />
        </div>
        <p className="text-2xl font-bold">{stats.weekly.orders}</p>
        <div className="flex items-center mt-2 text-sm">
          <TrendingUp className="h-4 w-4 mr-1" />
          <span className={stats.weekly.trend >= 0 ? 'text-green-500' : 'text-red-500'}>
            {stats.weekly.trend.toFixed(1)}%
          </span>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-medium">Ordini Mensili</h3>
          <Package className="h-5 w-5 text-indigo-500" />
        </div>
        <p className="text-2xl font-bold">{stats.monthly.orders}</p>
        <div className="flex items-center mt-2 text-sm">
          <TrendingUp className="h-4 w-4 mr-1" />
          <span className={stats.monthly.trend >= 0 ? 'text-green-500' : 'text-red-500'}>
            {stats.monthly.trend.toFixed(1)}%
          </span>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-medium">Classificazione Cliente</h3>
          <Award className="h-5 w-5 text-yellow-500" />
        </div>
        <p className={`text-2xl font-bold ${stats.rank.color}`}>
          {stats.rank.tier}
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Top {Math.round(stats.rank.percentile)}%
        </p>
      </div>
    </>
  );
}