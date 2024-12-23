import React from 'react';
import { useAuth } from '../hooks/useAuth';
import ProductionStatistics from '../components/Statistics/ProductionStatistics';
import CustomerStatistics from '../components/Statistics/CustomerStatistics';

export default function StatisticsPage() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-8 text-center">
          {user?.role === 'production' ? 'Statistiche Produzione' : 'Statistiche Clienti'}
        </h1>

        {user?.role === 'production' ? (
          <ProductionStatistics />
        ) : (
          <CustomerStatistics />
        )}
      </div>
    </div>
  );
}