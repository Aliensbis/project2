import React from 'react';
import { Search, Filter } from 'lucide-react';
import { Agent } from '../../types/Auth';
import AgentOrdersFilter from './AgentOrdersFilter';

interface OrderFiltersProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  statusFilter: string;
  onStatusChange: (status: string) => void;
  agents: Agent[];
  selectedAgentId: string | null;
  onSelectAgent: (agentId: string | null) => void;
}

export default function OrderFilters({
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusChange,
  agents,
  selectedAgentId,
  onSelectAgent
}: OrderFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <div className="flex-1">
        <div className="relative">
          <Search className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cerca cliente..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <Filter className="h-5 w-5 text-gray-400" />
          <select
            value={statusFilter}
            onChange={(e) => onStatusChange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">Tutti gli stati</option>
            <option value="pending">In attesa</option>
            <option value="in-progress">In lavorazione</option>
            <option value="completed">Completati</option>
            <option value="shipped">Spediti</option>
          </select>
        </div>
        <AgentOrdersFilter
          agents={agents}
          selectedAgentId={selectedAgentId}
          onSelectAgent={onSelectAgent}
        />
      </div>
    </div>
  );
}