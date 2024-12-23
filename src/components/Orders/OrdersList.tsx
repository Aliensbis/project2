import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Truck, CheckCircle, Clock } from 'lucide-react';
import { Order, Customer } from '../../types/Order';
import { products } from '../../data/products';
import { formatDate } from '../../utils/dateUtils';

interface OrdersListProps {
  orders: Order[];
  customers: Customer[];
  onUpdateStatus: (orderId: string, status: Order['status'], completedBoxes?: Record<string, number>) => void;
}

export default function OrdersList({ orders, customers, onUpdateStatus }: OrdersListProps) {
  const [expandedOrders, setExpandedOrders] = useState<string[]>([]);

  const toggleOrder = (orderId: string) => {
    setExpandedOrders(prev => 
      prev.includes(orderId)
        ? prev.filter(id => id !== orderId)
        : [...prev, orderId]
    );
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending': return 'text-yellow-600 bg-yellow-50';
      case 'in-progress': return 'text-blue-600 bg-blue-50';
      case 'completed': return 'text-green-600 bg-green-50';
      case 'shipped': return 'text-purple-600 bg-purple-50';
    }
  };

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'pending': return <Clock className="h-5 w-5" />;
      case 'in-progress': return <Clock className="h-5 w-5" />;
      case 'completed': return <CheckCircle className="h-5 w-5" />;
      case 'shipped': return <Truck className="h-5 w-5" />;
    }
  };

  const getStatusText = (status: Order['status']) => {
    switch (status) {
      case 'pending': return 'In attesa';
      case 'in-progress': return 'In lavorazione';
      case 'completed': return 'Completato';
      case 'shipped': return 'Spedito';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Ordini</h3>
      </div>
      <div className="divide-y divide-gray-200">
        {orders.map((order) => {
          const customer = customers.find(c => c.id === order.customerId);
          const isExpanded = expandedOrders.includes(order.id);
          const totalBoxes = order.items.reduce((sum, item) => sum + item.boxes, 0);
          const completedBoxes = order.items.reduce((sum, item) => sum + item.completed, 0);

          return (
            <div key={order.id} className="p-4">
              <div 
                className="flex items-center justify-between cursor-pointer"
                onClick={() => toggleOrder(order.id)}
              >
                <div className="flex items-center space-x-3">
                  {isExpanded 
                    ? <ChevronDown className="h-5 w-5 text-gray-500" />
                    : <ChevronRight className="h-5 w-5 text-gray-500" />
                  }
                  <div>
                    <h4 className="text-lg font-medium text-gray-900">
                      {customer?.name}
                    </h4>
                    <p className="text-sm text-gray-500">
                      {formatDate(order.date)} - {totalBoxes} cartoni ({order.totalPallets} pedane)
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className={`flex items-center space-x-2 px-3 py-1 rounded-full ${getStatusColor(order.status)}`}>
                    {getStatusIcon(order.status)}
                    <span className="text-sm font-medium">{getStatusText(order.status)}</span>
                  </div>
                </div>
              </div>

              {isExpanded && (
                <div className="mt-4 pl-8">
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-medium text-gray-700 mb-2">Dettagli Ordine</h5>
                        <div className="space-y-2">
                          {order.items.map((item) => {
                            const product = products.find(p => p.id === item.productId);
                            return (
                              <div key={item.productId} className="flex justify-between items-center">
                                <span className="text-sm">{product?.name}</span>
                                <div className="flex items-center space-x-2">
                                  <input
                                    type="number"
                                    value={item.completed}
                                    onChange={(e) => {
                                      const value = parseInt(e.target.value);
                                      if (value >= 0 && value <= item.boxes) {
                                        const updatedBoxes = {
                                          ...order.items.reduce((acc, i) => ({
                                            ...acc,
                                            [i.productId]: i.completed
                                          }), {}),
                                          [item.productId]: value
                                        };
                                        onUpdateStatus(order.id, order.status, updatedBoxes);
                                      }
                                    }}
                                    className="w-20 px-2 py-1 text-sm border border-gray-300 rounded"
                                  />
                                  <span className="text-sm text-gray-500">/ {item.boxes}</span>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                      <div>
                        <h5 className="font-medium text-gray-700 mb-2">Stato Avanzamento</h5>
                        <div className="space-y-2">
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div
                              className="bg-blue-600 h-2.5 rounded-full"
                              style={{ width: `${(completedBoxes / totalBoxes) * 100}%` }}
                            ></div>
                          </div>
                          <p className="text-sm text-gray-600">
                            {completedBoxes} su {totalBoxes} cartoni completati
                          </p>
                        </div>
                        <div className="mt-4 space-x-2">
                          {order.status === 'pending' && (
                            <button
                              onClick={() => onUpdateStatus(order.id, 'in-progress')}
                              className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                            >
                              Avvia Lavorazione
                            </button>
                          )}
                          {order.status === 'in-progress' && completedBoxes === totalBoxes && (
                            <button
                              onClick={() => onUpdateStatus(order.id, 'completed')}
                              className="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700"
                            >
                              Segna come Completato
                            </button>
                          )}
                          {order.status === 'completed' && (
                            <button
                              onClick={() => onUpdateStatus(order.id, 'shipped')}
                              className="px-3 py-1 text-sm bg-purple-600 text-white rounded hover:bg-purple-700"
                            >
                              Segna come Spedito
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                    {order.notes && (
                      <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded">
                        <span className="font-medium">Note:</span> {order.notes}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}