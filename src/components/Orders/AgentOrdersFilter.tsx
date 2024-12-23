import React from 'react';
import { Users } from 'lucide-react';
import { Agent } from '../../types/Auth';

interface AgentOrdersFilterProps {
  agents: Agent[];
  selectedAgentId: string | null;
  onSelectAgent: (agentId: string | null) => void;
}

export default function AgentOrdersFilter({
  agents,
  selectedAgentId,
  onSelectAgent
}: AgentOrdersFilterProps) {
  const activeAgents = agents.filter(agent => agent.active);

  return (
    <div className="flex items-center space-x-2">
      <Users className="h-5 w-5 text-gray-400" />
      <select
        value={selectedAgentId || ''}
        onChange={(e) => onSelectAgent(e.target.value || null)}
        className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
      >
        <option value="">Tutti gli agenti</option>
        {activeAgents.map(agent => (
          <option key={agent.id} value={agent.id}>
            {agent.name}
          </option>
        ))}
      </select>
    </div>
  );
}