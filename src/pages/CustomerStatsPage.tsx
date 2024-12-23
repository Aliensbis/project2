import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, Calendar, Package, TrendingUp } from 'lucide-react';
import { useOrders } from '../hooks/useOrders';
import CustomerOrderHistory from '../components/Statistics/CustomerOrderHistory';
import CustomerMetrics from '../components/Statistics/CustomerMetrics';
import { getCustomerTier } from '../utils/customerUtils';

export default function CustomerStatsPage() {
  const { customerId } = useParams();
  const { customers, getCustomerOrders, getCustomerStats } = useOrders();
  const [period, setPeriod] = useState<'week' | 'month' | 'year'>('month');

  const customer = customers.find(c => c.id === customerId);
  const orders = getCustomerOrders(customerId || '');
  const stats = getCustomerStats(customerId || '');
  const tier = getCustomerTier(stats.totalOrders);

  if (!customer) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900">Cliente non trovato</h2>
            <Link to="/statistics" className="text-indigo-600 hover:text-indigo-700">
              Torna alle statistiche
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <Link
            to="/statistics"
            className="inline-flex items-center text-indigo-600 hover:text-indigo-700"
          >
            <ChevronLeft className="h-5 w-5 mr-1" />
            Torna alle statistiche
          </Link>
        </div>

        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{customer.name}</h1>
            <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
              tier.color === 'text-purple-600' ? 'bg-purple-50' :
              tier.color === 'text-yellow-600' ? 'bg-yellow-50' :
              tier.color === 'text-gray-600' ? 'bg-gray-50' : 'bg-orange-50'
            }`}>
              Cliente {tier.label}
            </div>
          </div>

          <div className="flex space-x-2">
            <button
              onClick={() => setPeriod('week')}
              className={`px-4 py-2 rounded-md ${
                period === 'week'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              Settimana
            </button>
            <button
              onClick={() => setPeriod('month')}
              className={`px-4 py-2 rounded-md ${
                period === 'month'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              Mese
            </button>
            <button
              onClick={() => setPeriod('year')}
              className={`px-4 py-2 rounded-md ${
                period === 'year'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              Anno
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <CustomerMetrics stats={stats} />
        </div>

        <CustomerOrderHistory 
          orders={orders} 
          period={period}
        />
      </div>
    </div>
  );
}