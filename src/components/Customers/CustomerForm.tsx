import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Customer } from '../../types/Order';
import { useAuth } from '../../hooks/useAuth';
import { useAgents } from '../../hooks/useAgents';

interface CustomerFormProps {
  customer?: Customer;
  onSubmit: (data: Partial<Customer>) => void;
  onClose: () => void;
}

export default function CustomerForm({ customer, onSubmit, onClose }: CustomerFormProps) {
  const { user } = useAuth();
  const { agents } = useAgents();
  const [formData, setFormData] = useState({
    name: customer?.name || '',
    address: customer?.address || '',
    phone: customer?.phone || '',
    email: customer?.email || '',
    agentId: customer?.agentId || ''
  });

  const isAdmin = user?.role === 'admin';
  const isProduction = user?.role === 'production';
  const showAgentSelect = (isAdmin || isProduction) && agents.length > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    // If current user is an agent, automatically assign the customer to them
    const submitData = {
      ...formData,
      agentId: user?.role === 'agent' ? user.id : formData.agentId
    };

    onSubmit(submitData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              {customer ? 'Modifica Cliente' : 'Nuovo Cliente'}
            </h3>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nome *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Indirizzo
              </label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Telefono
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {showAgentSelect && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Agente Assegnato
                </label>
                <select
                  value={formData.agentId}
                  onChange={(e) => setFormData(prev => ({ ...prev, agentId: e.target.value }))}
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

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
              >
                Annulla
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                {customer ? 'Salva Modifiche' : 'Crea Cliente'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}