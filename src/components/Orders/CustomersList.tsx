import React, { useState } from 'react';
import { Plus, User, Edit, Trash2 } from 'lucide-react';
import { Customer } from '../../types/Order';
import NewCustomerForm from './Forms/NewCustomerForm';
import EditCustomerForm from './Forms/EditCustomerForm';

interface CustomersListProps {
  customers: Customer[];
  selectedCustomer: string | null;
  onSelectCustomer: (customerId: string | null) => void;
  onAddCustomer: (customer: Omit<Customer, 'id'>) => void;
  onEditCustomer: (id: string, updates: Partial<Customer>) => void;
  onDeleteCustomer: (id: string) => void;
}

export default function CustomersList({
  customers,
  selectedCustomer,
  onSelectCustomer,
  onAddCustomer,
  onEditCustomer,
  onDeleteCustomer,
}: CustomersListProps) {
  const [showNewCustomer, setShowNewCustomer] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);

  const handleDelete = (id: string) => {
    if (window.confirm('Sei sicuro di voler eliminare questo cliente? Questa azione non può essere annullata.')) {
      onDeleteCustomer(id);
      if (selectedCustomer === id) {
        onSelectCustomer(null);
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-4 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-900">Clienti</h3>
          <button
            onClick={() => setShowNewCustomer(true)}
            className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-full"
          >
            <Plus className="h-5 w-5" />
          </button>
        </div>
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
          <div
            key={customer.id}
            className={`p-4 ${
              selectedCustomer === customer.id ? 'bg-indigo-50' : 'hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center justify-between">
              <div 
                className="flex items-center space-x-3 cursor-pointer flex-grow"
                onClick={() => onSelectCustomer(customer.id)}
              >
                <User className="h-5 w-5 text-gray-400" />
                <div>
                  <h4 className="font-medium text-gray-900">{customer.name}</h4>
                  {customer.email && (
                    <p className="text-sm text-gray-500">{customer.email}</p>
                  )}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setEditingCustomer(customer);
                  }}
                  className="p-1 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded"
                >
                  <Edit className="h-4 w-4" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(customer.id);
                  }}
                  className="p-1 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showNewCustomer && (
        <NewCustomerForm
          onSubmit={(customer) => {
            onAddCustomer(customer);
            setShowNewCustomer(false);
          }}
          onClose={() => setShowNewCustomer(false)}
        />
      )}

      {editingCustomer && (
        <EditCustomerForm
          customer={editingCustomer}
          onSubmit={(updates) => {
            onEditCustomer(editingCustomer.id, updates);
            setEditingCustomer(null);
          }}
          onClose={() => setEditingCustomer(null)}
        />
      )}
    </div>
  );
}