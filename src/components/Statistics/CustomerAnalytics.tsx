import React from 'react';
import { TrendingUp, TrendingDown, Package, ShoppingBag, Award } from 'lucide-react';
import { CustomerAnalytics as CustomerAnalyticsType } from '../../utils/customerAnalytics';

interface CustomerAnalyticsProps {
  analytics: CustomerAnalyticsType;
  period: 'weekly' | 'monthly' | 'yearly';
}

export default function CustomerAnalytics({ analytics, period }: CustomerAnalyticsProps) {
  const data = analytics[period];
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Ordini</h3>
            <ShoppingBag className="h-6 w-6 text-blue-500" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{data.orders}</p>
          <div className="mt-2 flex items-center">
            {data.trend > 0 ? (
              <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
            ) : (
              <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
            )}
            <span className={data.trend > 0 ? 'text-green-500' : 'text-red-500'}>
              {Math.abs(Math.round(data.trend))}% rispetto al periodo precedente
            </span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Cartoni</h3>
            <Package className="h-6 w-6 text-indigo-500" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{data.boxes}</p>
          <div className="mt-2 flex items-center">
            {data.trend > 0 ? (
              <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
            ) : (
              <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
            )}
            <span className={data.trend > 0 ? 'text-green-500' : 'text-red-500'}>
              {Math.abs(Math.round(data.trend))}% rispetto al periodo precedente
            </span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Classificazione</h3>
            <Award className="h-6 w-6 text-yellow-500" />
          </div>
          <div className={`text-2xl font-bold ${analytics.rank.color}`}>
            {analytics.rank.tier}
          </div>
          <p className="mt-2 text-sm text-gray-600">
            Top {Math.round(analytics.rank.percentile)}% dei clienti
          </p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Dettagli Performance</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Media ordini {period === 'weekly' ? 'settimanali' : period === 'monthly' ? 'mensili' : 'annuali'}</span>
            <span className="font-semibold">{(data.orders / (period === 'weekly' ? 1 : period === 'monthly' ? 4 : 52)).toFixed(1)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Media cartoni per ordine</span>
            <span className="font-semibold">{data.orders > 0 ? Math.round(data.boxes / data.orders) : 0}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Trend generale</span>
            <span className={`font-semibold ${data.trend >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {data.trend >= 0 ? '↗' : '↘'} {Math.abs(Math.round(data.trend))}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}