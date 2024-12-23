import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Customer } from '../../types/Order';
import { Agent } from '../../types/Auth';

interface CustomerSelectionProps {
  customers: Customer[];
  agents: Agent[];
  selectedCustomerId: string;
  onSelectCustomer: (customerId: string) => void;
  onSelectAgent: (agentId: string | null) => void;
}

export default function CustomerSelection({
  customers,
  agents,
  selectedCustomerId,
  onSelectCustomer,
  onSelectAgent
}: CustomerSelectionProps) {
  const { user } = useAuth();
  const isAdminOrProduction = user?.role === 'admin' || user?.role === 'production';

  // Group customers by agent
  const customersByAgent = customers.reduce((acc, customer) => {
    if (customer.agentId) {
      if (!acc[customer.agentId]) {
        acc[customer.agentId] = [];
      }
      acc[customer.agentId].push(customer);
    }
    return acc;
  }, {} as Record<string, Customer[]>);

  // Get unassigned customers
  const unassignedCustomers = customers.filter(c => !c.agentId);

  return (
    <div className="space-y-4">
      {isAdminOrProduction && (
        <>
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Clienti Diretti</h3>
            <select
              value={selectedCustomerId}
              onChange={(e) => {
                onSelectCustomer(e.target.value);
                onSelectAgent(null);
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Seleziona cliente</option>
              {unassignedCustomers.map(customer => (
                <option key={customer.id} value={customer.id}>
                  {customer.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Clienti Agenti</h3>
            {agents.map(agent => (
              <div key={agent.id} className="mb-4">
                <h4 className="font-medium text-gray-700 mb-1">{agent.name}</h4>
                <select
                  value={selectedCustomerId}
                  onChange={(e) => {
                    onSelectCustomer(e.target.value);
                    onSelectAgent(agent.id);
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">Seleziona cliente</option>
                  {customersByAgent[agent.id]?.map(customer => (
                    <option key={customer.id} value={customer.id}>
                      {customer.name}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        </>
      )}

      {user?.role === 'agent' && (
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">I Miei Clienti</h3>
          <select
            value={selectedCustomerId}
            onChange={(e) => onSelectCustomer(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Seleziona cliente</option>
            {customersByAgent[user.id]?.map(customer => (
              <option key={customer.id} value={customer.id}>
                {customer.name}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
}