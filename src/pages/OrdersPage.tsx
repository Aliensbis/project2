import React, { useState } from 'react';
import { ShoppingBag, Plus } from 'lucide-react';
import { useOrders } from '../hooks/useOrders';
import { useAgents } from '../hooks/useAgents';
import NewOrderForm from '../components/Orders/NewOrderForm';
import OrderList from '../components/Orders/OrderList';
import OrderFilters from '../components/Orders/OrderFilters';
import OrderStats from '../components/Orders/OrderStats';

export default function OrdersPage() {
  const { orders, customers, addOrder, updateOrder, deleteOrder } = useOrders();
  const { agents } = useAgents();
  const [showNewOrder, setShowNewOrder] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedAgentId, setSelectedAgentId] = useState<string | null>(null);

  const filteredOrders = orders.filter(order => {
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    const customer = customers.find(c => c.id === order.customerId);
    const matchesSearch = !searchTerm || 
      customer?.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesAgent = !selectedAgentId || order.agentId === selectedAgentId;
    
    return matchesStatus && matchesSearch && matchesAgent;
  }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const handleDeleteOrder = (orderId: string) => {
    if (window.confirm('Sei sicuro di voler eliminare questo ordine? Questa azione non può essere annullata.')) {
      deleteOrder(orderId);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <ShoppingBag className="h-8 w-8 text-indigo-600 mr-2" />
            <h1 className="text-2xl font-bold text-gray-900">Gestione Ordini</h1>
          </div>
          <button
            onClick={() => setShowNewOrder(true)}
            className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            <Plus className="h-5 w-5 mr-2" />
            Nuovo Ordine
          </button>
        </div>

        <OrderFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          statusFilter={statusFilter}
          onStatusChange={setStatusFilter}
          agents={agents}
          selectedAgentId={selectedAgentId}
          onSelectAgent={setSelectedAgentId}
        />

        <OrderStats orders={filteredOrders} />

        <OrderList
          orders={filteredOrders}
          customers={customers}
          onUpdateOrder={updateOrder}
          onDeleteOrder={handleDeleteOrder}
        />

        {showNewOrder && (
          <NewOrderForm
            customers={customers}
            onSubmit={(order) => {
              addOrder(order);
              setShowNewOrder(false);
            }}
            onClose={() => setShowNewOrder(false)}
          />
        )}
      </div>
    </div>
  );
}