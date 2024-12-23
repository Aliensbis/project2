import React, { useState } from 'react';
import { Edit2, Save, X, Plus, Key } from 'lucide-react';
import { Agent } from '../../types/Auth';
import { EXAMPLE_CUSTOMERS } from '../../config/auth';

interface AgentDetailsProps {
  agent: Agent;
  onUpdate: (id: string, updates: Partial<Agent>) => void;
  onDelete: (id: string) => void;
}

export default function AgentDetails({
  agent,
  onUpdate,
  onDelete
}: AgentDetailsProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(agent);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [newPassword, setNewPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(agent.id, formData);
    setIsEditing(false);
  };

  const handlePasswordUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.trim()) {
      onUpdate(agent.id, { ...formData, password: newPassword });
      setShowPasswordForm(false);
      setNewPassword('');
    }
  };

  const customers = EXAMPLE_CUSTOMERS.filter(c => 
    agent.customers.includes(c.id)
  );

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{agent.name}</h2>
          <p className="text-gray-500">ID: {agent.id}</p>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="p-2 text-gray-600 hover:bg-gray-100 rounded"
          >
            {isEditing ? (
              <X className="h-5 w-5" />
            ) : (
              <Edit2 className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nome
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Telefono
            </label>
            <input
              type="tel"
              value={formData.phone || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
            >
              Annulla
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Salva Modifiche
            </button>
          </div>
        </form>
      ) : (
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Informazioni Contatto</h3>
            <div className="space-y-2">
              <p className="text-gray-600">
                <span className="font-medium">Email:</span> {agent.email}
              </p>
              {agent.phone && (
                <p className="text-gray-600">
                  <span className="font-medium">Telefono:</span> {agent.phone}
                </p>
              )}
              <p className="text-gray-600">
                <span className="font-medium">Stato:</span>{' '}
                <span className={agent.active ? 'text-green-600' : 'text-red-600'}>
                  {agent.active ? 'Attivo' : 'Inattivo'}
                </span>
              </p>
            </div>

            <button
              onClick={() => setShowPasswordForm(true)}
              className="mt-4 flex items-center px-4 py-2 text-sm text-indigo-600 hover:bg-indigo-50 rounded-md"
            >
              <Key className="h-4 w-4 mr-2" />
              Modifica Password
            </button>
          </div>

          {showPasswordForm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
                <h3 className="text-lg font-medium mb-4">Modifica Password</h3>
                <form onSubmit={handlePasswordUpdate} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nuova Password
                    </label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                      required
                    />
                  </div>
                  <div className="flex justify-end space-x-4">
                    <button
                      type="button"
                      onClick={() => {
                        setShowPasswordForm(false);
                        setNewPassword('');
                      }}
                      className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                    >
                      Annulla
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                    >
                      Aggiorna Password
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Portfolio Clienti</h3>
              <button className="flex items-center text-sm text-indigo-600 hover:text-indigo-700">
                <Plus className="h-4 w-4 mr-1" />
                Aggiungi Cliente
              </button>
            </div>
            <div className="space-y-3">
              {customers.map(customer => (
                <div key={customer.id} className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-gray-900">{customer.name}</h4>
                      <p className="text-sm text-gray-500">{customer.address}</p>
                    </div>
                  </div>
                  <div className="mt-2 text-sm text-gray-600">
                    <p>Tel: {customer.phone}</p>
                    <p>Email: {customer.email}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}