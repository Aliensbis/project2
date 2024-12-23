import React, { useState } from 'react';
import { Users, Trash2 } from 'lucide-react';
import CustomersList from './CustomersList';
import CustomerMetrics from './CustomerMetrics';
import CustomerOrderHistory from './CustomerOrderHistory';
import { useOrders } from '../../hooks/useOrders';
import { calculateCustomerAnalytics } from '../../utils/customerAnalytics';

export default function CustomerStatistics() {
  const { orders, customers } = useOrders();
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(null);
  const [customerViewPeriod, setCustomerViewPeriod] = useState<'week' | 'month' | 'year'>('month');

  const customerStats = customers.reduce((acc, customer) => {
    const customerOrders = orders.filter(o => o.customerId === customer.id);
    const totalOrders = customerOrders.length;
    const totalBoxes = customerOrders.reduce((sum, order) => 
      sum + order.items.reduce((itemSum, item) => itemSum + item.boxes, 0), 0);
    
    return {
      ...acc,
      [customer.id]: { totalOrders, totalBoxes }
    };
  }, {} as Record<string, { totalOrders: number; totalBoxes: number }>);

  const selectedCustomerAnalytics = selectedCustomerId 
    ? calculateCustomerAnalytics(
        orders.filter(o => o.customerId === selectedCustomerId),
        orders
      )
    : null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      <div className="lg:col-span-1">
        <CustomersList
          customers={customers}
          selectedCustomerId={selectedCustomerId}
          onSelectCustomer={setSelectedCustomerId}
          customerStats={customerStats}
        />
      </div>

      <div className="lg:col-span-3">
        {selectedCustomerId && selectedCustomerAnalytics ? (
          <div className="space-y-8">
            <div className="flex space-x-4">
              <button
                onClick={() => setCustomerViewPeriod('week')}
                className={`px-4 py-2 rounded-md ${
                  customerViewPeriod === 'week'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                Settimana
              </button>
              <button
                onClick={() => setCustomerViewPeriod('month')}
                className={`px-4 py-2 rounded-md ${
                  customerViewPeriod === 'month'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                Mese
              </button>
              <button
                onClick={() => setCustomerViewPeriod('year')}
                className={`px-4 py-2 rounded-md ${
                  customerViewPeriod === 'year'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                Anno
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <CustomerMetrics stats={selectedCustomerAnalytics} />
            </div>

            <CustomerOrderHistory
              orders={orders.filter(o => o.customerId === selectedCustomerId)}
              period={customerViewPeriod}
            />
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Seleziona un Cliente
            </h3>
            <p className="text-gray-500">
              Seleziona un cliente dalla lista per visualizzare le sue statistiche dettagliate
            </p>
          </div>
        )}
      </div>
    </div>
  );
}