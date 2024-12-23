import React, { useState } from 'react';
import { Users } from 'lucide-react';
import { useAgents } from '../hooks/useAgents';
import { useChat } from '../hooks/useChat';
import { Agent } from '../types/Auth';
import ProductionAgentsList from '../components/Agents/ProductionAgentsList';
import ProductionAgentView from '../components/Agents/ProductionAgentView';

export default function ProductionAgentsPage() {
  const { agents } = useAgents();
  const { startConversation } = useChat();
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);

  const handleStartChat = async (agent: Agent) => {
    if (!agent) return;
    await startConversation({
      id: agent.id,
      role: 'agent',
      name: agent.name
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center mb-8">
          <Users className="h-8 w-8 text-blue-600 mr-2" />
          <h1 className="text-2xl font-bold text-gray-900">Gestione Agenti</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <ProductionAgentsList
              agents={agents}
              onSelectAgent={setSelectedAgent}
            />
          </div>

          <div className="lg:col-span-3">
            {selectedAgent ? (
              <ProductionAgentView
                agent={selectedAgent}
                onStartChat={handleStartChat}
              />
            ) : (
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Seleziona un Agente
                </h3>
                <p className="text-gray-500">
                  Seleziona un agente dalla lista per visualizzare i dettagli e comunicare
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}