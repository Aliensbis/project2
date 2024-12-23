import React from 'react';
import { Users } from 'lucide-react';
import { Agent } from '../../types/Auth';

interface ProductionAgentsListProps {
  agents: Agent[];
  onSelectAgent: (agent: Agent) => void;
}

export default function ProductionAgentsList({ agents, onSelectAgent }: ProductionAgentsListProps) {
  const activeAgents = agents.filter(agent => agent.active);

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center">
          <Users className="h-5 w-5 text-blue-600 mr-2" />
          <h3 className="text-lg font-semibold text-gray-900">Agenti Attivi</h3>
        </div>
      </div>
      <div className="divide-y divide-gray-200">
        {activeAgents.map(agent => (
          <div
            key={agent.id}
            onClick={() => onSelectAgent(agent)}
            className="p-4 hover:bg-gray-50 cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900">{agent.name}</h4>
                <p className="text-sm text-gray-500">{agent.email}</p>
              </div>
              {agent.phone && (
                <p className="text-sm text-gray-600">{agent.phone}</p>
              )}
            </div>
          </div>
        ))}
        {activeAgents.length === 0 && (
          <div className="p-4 text-center text-gray-500">
            Nessun agente attivo
          </div>
        )}
      </div>
    </div>
  );
}