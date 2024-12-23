import React, { useState } from 'react';
import { Users, Plus } from 'lucide-react';
import { useCustomers } from '../hooks/useCustomers';
import { useAgents } from '../hooks/useAgents';
import { Customer } from '../types/Order';
import CustomersList from '../components/Customers/CustomersList';
import CustomerDetails from '../components/Customers/CustomerDetails';
import CustomerForm from '../components/Customers/CustomerForm';

export default function CustomersPage() {
  const { customers, addCustomer, updateCustomer, deleteCustomer, assignToAgent } = useCustomers();
  const { agents } = useAgents();
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [showNewCustomerForm, setShowNewCustomerForm] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <Users className="h-8 w-8 text-blue-600 mr-2" />
            <h1 className="text-2xl font-bold text-gray-900">Gestione Clienti</h1>
          </div>
          <button
            onClick={() => setShowNewCustomerForm(true)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            <Plus className="h-5 w-5 mr-2" />
            Nuovo Cliente
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <CustomersList
              customers={customers}
              selectedCustomer={selectedCustomer}
              onSelectCustomer={setSelectedCustomer}
              onAddCustomer={addCustomer}
              onEditCustomer={updateCustomer}
              onDeleteCustomer={deleteCustomer}
            />
          </div>

          <div className="lg:col-span-3">
            {selectedCustomer ? (
              <CustomerDetails
                customer={selectedCustomer}
                agents={agents}
                onUpdate={(updates) => updateCustomer(selectedCustomer.id, updates)}
                onAssignAgent={(agentId) => assignToAgent(selectedCustomer.id, agentId)}
                onDelete={() => {
                  if (window.confirm('Sei sicuro di voler eliminare questo cliente?')) {
                    deleteCustomer(selectedCustomer.id);
                    setSelectedCustomer(null);
                  }
                }}
              />
            ) : (
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Seleziona un Cliente
                </h3>
                <p className="text-gray-500">
                  Seleziona un cliente dalla lista per visualizzare i dettagli
                </p>
              </div>
            )}
          </div>
        </div>

        {showNewCustomerForm && (
          <CustomerForm
            onSubmit={(customerData) => {
              addCustomer(customerData);
              setShowNewCustomerForm(false);
            }}
            onClose={() => setShowNewCustomerForm(false)}
          />
        )}
      </div>
    </div>
  );
}