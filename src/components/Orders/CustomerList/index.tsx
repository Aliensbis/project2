import React from 'react';
import { Customer, CustomerStats } from '../../../types/Order';
import CustomerListItem from './CustomerListItem';

interface CustomerListProps {
  customers: Customer[];
  selectedCustomer: string | null;
  customerStats: Record<string, CustomerStats>;
  onSelectCustomer: (customerId: string | null) => void;
  onDeleteCustomer: (customerId: string) => void;
}

export default function CustomerList({
  customers,
  selectedCustomer,
  customerStats,
  onSelectCustomer,
  onDeleteCustomer
}: CustomerListProps) {
  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Clienti</h3>
      </div>
      <div className="divide-y divide-gray-200">
        <div
          className={`p-4 cursor-pointer ${
            !selectedCustomer ? 'bg-indigo-50' : 'hover:bg-gray-50'
          }`}
          onClick={() => onSelectCustomer(null)}
        >
          Tutti i clienti
        </div>
        {customers.map(customer => (
          <CustomerListItem
            key={customer.id}
            customer={customer}
            stats={customerStats[customer.id]}
            isSelected={selectedCustomer === customer.id}
            onSelect={() => onSelectCustomer(customer.id)}
            onDelete={() => onDeleteCustomer(customer.id)}
          />
        ))}
      </div>
    </div>
  );
}