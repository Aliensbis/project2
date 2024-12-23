import React from 'react';
import { TrendingUp, Package, Users } from 'lucide-react';
import { Agent } from '../../types/Auth';
import { Order, Customer } from '../../types/Order';

interface AgentOrderStatsProps {
  agent: Agent;
  orders: Order[];
  customers: Customer[];
}

export default function AgentOrderStats({ agent, orders, customers }: AgentOrderStatsProps) {
  const agentCustomers = customers.filter(c => c.agentId === agent.id);
  const agentOrders = orders.filter(o => o.agentId === agent.id);

  const totalOrders = agentOrders.length;
  const totalBoxes = agentOrders.reduce((sum, order) => 
    sum + order.items.reduce((itemSum, item) => itemSum + item.boxes, 0), 0);
  const totalPallets = agentOrders.reduce((sum, order) => sum + order.totalPallets, 0);

  const completedOrders = agentOrders.filter(o => 
    o.status === 'completed' || o.status === 'shipped'
  ).length;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">{agent.name}</h2>
        <span className="text-sm text-gray-500">{agentCustomers.length} clienti gestiti</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-blue-700 font-medium">Ordini</span>
            <Package className="h-5 w-5 text-blue-600" />
          </div>
          <p className="text-2xl font-bold text-blue-900">{totalOrders}</p>
          <p className="text-sm text-blue-700">{completedOrders} completati</p>
        </div>

        <div className="bg-green-50 p-4 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-green-700 font-medium">Cartoni</span>
            <TrendingUp className="h-5 w-5 text-green-600" />
          </div>
          <p className="text-2xl font-bold text-green-900">{totalBoxes}</p>
          <p className="text-sm text-green-700">{totalPallets} pedane</p>
        </div>

        <div className="bg-purple-50 p-4 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-purple-700 font-medium">Clienti</span>
            <Users className="h-5 w-5 text-purple-600" />
          </div>
          <p className="text-2xl font-bold text-purple-900">{agentCustomers.length}</p>
          <p className="text-sm text-purple-700">
            {agentCustomers.filter(c => 
              agentOrders.some(o => o.customerId === c.id)
            ).length} attivi
          </p>
        </div>
      </div>
    </div>
  );
}