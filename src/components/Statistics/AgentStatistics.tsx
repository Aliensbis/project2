import React from 'react';
import { useAgents } from '../../hooks/useAgents';
import { useOrders } from '../../hooks/useOrders';
import AgentOrderStats from '../Orders/AgentOrderStats';

export default function AgentStatistics() {
  const { agents } = useAgents();
  const { orders, customers } = useOrders();
  const activeAgents = agents.filter(agent => agent.active);

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-gray-900">Statistiche Agenti</h2>
      
      {activeAgents.map(agent => (
        <AgentOrderStats
          key={agent.id}
          agent={agent}
          orders={orders}
          customers={customers}
        />
      ))}

      {activeAgents.length === 0 && (
        <div className="text-center py-8 bg-white rounded-lg shadow-md">
          <p className="text-gray-500">Nessun agente attivo</p>
        </div>
      )}
    </div>
  );
}