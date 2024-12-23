import React, { useState } from 'react';
import { Users, Plus } from 'lucide-react';
import { Agent } from '../types/Auth';
import { useAuth } from '../hooks/useAuth';
import { useAgents } from '../hooks/useAgents';
import AgentsList from '../components/Agents/AgentsList';
import AgentDetails from '../components/Agents/AgentDetails';
import NewAgentForm from '../components/Agents/NewAgentForm';

export default function AgentsPage() {
  const { user } = useAuth();
  const { agents, addAgent, updateAgent, deleteAgent } = useAgents();
  const [showNewAgent, setShowNewAgent] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);

  if (user?.role !== 'admin') {
    return <div>Accesso non autorizzato</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <Users className="h-8 w-8 text-indigo-600 mr-2" />
            <h1 className="text-2xl font-bold text-gray-900">Gestione Agenti</h1>
          </div>
          <button
            onClick={() => setShowNewAgent(true)}
            className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            <Plus className="h-5 w-5 mr-2" />
            Nuovo Agente
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <AgentsList
              agents={agents}
              selectedAgent={selectedAgent}
              onSelectAgent={setSelectedAgent}
              onDeleteAgent={deleteAgent}
            />
          </div>

          <div className="lg:col-span-3">
            {selectedAgent ? (
              <AgentDetails
                agent={selectedAgent}
                onUpdate={updateAgent}
                onDelete={deleteAgent}
              />
            ) : (
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Seleziona un Agente
                </h3>
                <p className="text-gray-500">
                  Seleziona un agente dalla lista per visualizzare i dettagli
                </p>
              </div>
            )}
          </div>
        </div>

        {showNewAgent && (
          <NewAgentForm
            onSubmit={(agent) => {
              addAgent(agent);
              setShowNewAgent(false);
            }}
            onClose={() => setShowNewAgent(false)}
          />
        )}
      </div>
    </div>
  );
}