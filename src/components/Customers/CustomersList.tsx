import React from 'react';
import { User } from 'lucide-react';
import { Customer } from '../../types/Order';

interface CustomersListProps {
  customers: Customer[];
  selectedCustomer: Customer | null;
  onSelectCustomer: (customer: Customer | null) => void;
  onAddCustomer: (customer: Omit<Customer, 'id'>) => void;
  onEditCustomer: (id: string, updates: Partial<Customer>) => void;
  onDeleteCustomer: (id: string) => void;
}

export default function CustomersList({
  customers,
  selectedCustomer,
  onSelectCustomer
}: CustomersListProps) {
  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Clienti</h3>
      </div>
      <div className="divide-y divide-gray-200">
        {customers.map(customer => (
          <div
            key={customer.id}
            onClick={() => onSelectCustomer(customer)}
            className={`p-4 cursor-pointer hover:bg-gray-50 ${
              selectedCustomer?.id === customer.id ? 'bg-blue-50' : ''
            }`}
          >
            <div className="flex items-center space-x-3">
              <User className="h-5 w-5 text-gray-400" />
              <div>
                <h4 className="font-medium text-gray-900">{customer.name}</h4>
                {customer.email && (
                  <p className="text-sm text-gray-500">{customer.email}</p>
                )}
              </div>
            </div>
          </div>
        ))}

        {customers.length === 0 && (
          <div className="p-4 text-center text-gray-500">
            Nessun cliente trovato
          </div>
        )}
      </div>
    </div>
  );
}