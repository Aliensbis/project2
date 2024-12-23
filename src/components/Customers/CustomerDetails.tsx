import React, { useState } from 'react';
import { Edit2, Trash2, User } from 'lucide-react';
import { Customer } from '../../types/Order';
import { Agent } from '../../types/Auth';
import { useAuth } from '../../hooks/useAuth';
import CustomerForm from './CustomerForm';

interface CustomerDetailsProps {
  customer: Customer;
  agents: Agent[];
  onUpdate: (updates: Partial<Customer>) => void;
  onAssignAgent: (agentId: string | null) => void;
  onDelete: () => void;
}

export default function CustomerDetails({
  customer,
  agents,
  onUpdate,
  onAssignAgent,
  onDelete
}: CustomerDetailsProps) {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const isAdmin = user?.role === 'admin';
  const isProduction = user?.role === 'production';
  const canAssignAgent = (isAdmin || isProduction) && agents.length > 0;

  const assignedAgent = agents.find(agent => agent.id === customer.agentId);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center">
          <User className="h-10 w-10 text-blue-600 mr-3" />
          <div>
            <h2 className="text-xl font-semibold text-gray-900">{customer.name}</h2>
            {assignedAgent && (
              <span className="text-sm text-gray-500">
                Agente: {assignedAgent.name}
              </span>
            )}
          </div>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setIsEditing(true)}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded"
          >
            <Edit2 className="h-5 w-5" />
          </button>
          <button
            onClick={onDelete}
            className="p-2 text-red-600 hover:bg-red-50 rounded"
          >
            <Trash2 className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Informazioni Contatto</h3>
          <div className="space-y-3">
            {customer.address && (
              <p className="text-gray-600">
                <span className="font-medium">Indirizzo:</span> {customer.address}
              </p>
            )}
            {customer.phone && (
              <p className="text-gray-600">
                <span className="font-medium">Telefono:</span> {customer.phone}
              </p>
            )}
            {customer.email && (
              <p className="text-gray-600">
                <span className="font-medium">Email:</span> {customer.email}
              </p>
            )}
          </div>
        </div>

        {canAssignAgent && (
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Assegnazione Agente</h3>
            <select
              value={customer.agentId || ''}
              onChange={(e) => onAssignAgent(e.target.value || null)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Nessun agente</option>
              {agents.map(agent => (
                <option key={agent.id} value={agent.id}>
                  {agent.name}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {isEditing && (
        <CustomerForm
          customer={customer}
          onSubmit={(updates) => {
            onUpdate(updates);
            setIsEditing(false);
          }}
          onClose={() => setIsEditing(false)}
        />
      )}
    </div>
  );
}