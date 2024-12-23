import React from 'react';
import { User, Trash2 } from 'lucide-react';
import { Agent } from '../../types/Auth';

interface AgentsListProps {
  agents: Agent[];
  selectedAgent: Agent | null;
  onSelectAgent: (agent: Agent) => void;
  onDeleteAgent: (id: string) => void;
}

export default function AgentsList({
  agents,
  selectedAgent,
  onSelectAgent,
  onDeleteAgent
}: AgentsListProps) {
  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Agenti</h3>
      </div>
      <div className="divide-y divide-gray-200">
        {agents.map(agent => (
          <div
            key={agent.id}
            className={`p-4 cursor-pointer ${
              selectedAgent?.id === agent.id ? 'bg-indigo-50' : 'hover:bg-gray-50'
            }`}
          >
            <div className="flex justify-between items-center">
              <div
                className="flex items-center space-x-3 flex-grow"
                onClick={() => onSelectAgent(agent)}
              >
                <User className="h-5 w-5 text-gray-400" />
                <div>
                  <h4 className="font-medium text-gray-900">{agent.name}</h4>
                  <p className="text-sm text-gray-500">{agent.email}</p>
                </div>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteAgent(agent.id);
                }}
                className="p-1 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}