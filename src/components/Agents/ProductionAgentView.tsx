import React from 'react';
import { Phone, Mail, Users } from 'lucide-react';
import { Agent } from '../../types/Auth';
import { useOrders } from '../../hooks/useOrders';

interface ProductionAgentViewProps {
  agent: Agent;
  onStartChat: (agent: Agent) => void;
}

export default function ProductionAgentView({ agent, onStartChat }: ProductionAgentViewProps) {
  const { customers } = useOrders();
  const agentCustomers = customers.filter(c => agent.customers.includes(c.id));

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{agent.name}</h2>
          <div className="mt-2 space-y-2">
            {agent.email && (
              <div className="flex items-center text-gray-600">
                <Mail className="h-4 w-4 mr-2" />
                {agent.email}
              </div>
            )}
            {agent.phone && (
              <div className="flex items-center text-gray-600">
                <Phone className="h-4 w-4 mr-2" />
                {agent.phone}
              </div>
            )}
          </div>
        </div>
        <button
          onClick={() => onStartChat(agent)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Invia Messaggio
        </button>
      </div>

      <div className="mt-8">
        <div className="flex items-center mb-4">
          <Users className="h-5 w-5 text-gray-600 mr-2" />
          <h3 className="text-lg font-semibold text-gray-900">Clienti Assegnati</h3>
        </div>
        <div className="space-y-3">
          {agentCustomers.map(customer => (
            <div key={customer.id} className="p-3 bg-gray-50 rounded-lg">
              <div className="font-medium text-gray-900">{customer.name}</div>
              {customer.address && (
                <div className="text-sm text-gray-600">{customer.address}</div>
              )}
            </div>
          ))}
          {agentCustomers.length === 0 && (
            <p className="text-gray-500 text-center">Nessun cliente assegnato</p>
          )}
        </div>
      </div>
    </div>
  );
}