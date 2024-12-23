import React from 'react';
import { Customer } from '../../types/Order';
import { getCustomerTier } from '../../utils/customerUtils';

interface CustomersListProps {
  customers: Customer[];
  selectedCustomerId: string | null;
  onSelectCustomer: (customerId: string) => void;
  customerStats: Record<string, { totalOrders: number; totalBoxes: number }>;
}

export default function CustomersList({
  customers,
  selectedCustomerId,
  onSelectCustomer,
  customerStats
}: CustomersListProps) {
  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">Clienti</h3>
      </div>
      <div className="divide-y divide-gray-200">
        {customers.map(customer => {
          const stats = customerStats[customer.id] || { totalOrders: 0, totalBoxes: 0 };
          const tier = getCustomerTier(stats.totalOrders);
          
          return (
            <div
              key={customer.id}
              className={`p-4 cursor-pointer hover:bg-gray-50 ${
                selectedCustomerId === customer.id ? 'bg-indigo-50' : ''
              }`}
              onClick={() => onSelectCustomer(customer.id)}
            >
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-medium text-gray-900">{customer.name}</h4>
                  <p className="text-sm text-gray-500">
                    {stats.totalOrders} ordini • {stats.totalBoxes} cartoni
                  </p>
                </div>
                <span className={`text-sm font-medium ${tier.color}`}>
                  {tier.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}