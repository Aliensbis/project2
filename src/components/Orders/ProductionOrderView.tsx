import React from 'react';
import { Order } from '../../types/Order';
import OrderLotManager from './OrderLotManager';
import OrderStatusManager from './OrderStatusManager';
import OrderQuantityManager from './OrderQuantityManager';

interface ProductionOrderViewProps {
  order: Order;
  onUpdateOrder: (orderId: string, updates: Partial<Order>) => void;
}

export default function ProductionOrderView({ order, onUpdateOrder }: ProductionOrderViewProps) {
  const handleStatusChange = (status: Order['status'], pickedUpBy?: string) => {
    const updates: Partial<Order> = { status };
    
    if (status === 'picked-up' && pickedUpBy) {
      updates.pickedUpBy = pickedUpBy;
      updates.pickedUpAt = new Date().toISOString();
    }
    
    onUpdateOrder(order.id, updates);
  };

  const handleQuantityUpdate = (productId: string, completed: number) => {
    const updatedItems = order.items.map(item => 
      item.productId === productId ? { ...item, completed } : item
    );
    onUpdateOrder(order.id, { items: updatedItems });
  };

  const handleLotUpdate = (productId: string, lots: any[]) => {
    const updatedItems = order.items.map(item => 
      item.productId === productId ? { ...item, lots } : item
    );
    onUpdateOrder(order.id, { items: updatedItems });
  };

  return (
    <div className="space-y-6">
      <OrderStatusManager 
        currentStatus={order.status}
        isAgentOrder={!!order.agentId}
        onStatusChange={handleStatusChange}
      />

      {order.pickedUpBy && order.pickedUpAt && (
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-medium text-gray-900 mb-2">Informazioni Ritiro</h3>
          <p className="text-sm text-gray-600">Ritirato da: {order.pickedUpBy}</p>
          <p className="text-sm text-gray-600">
            Data ritiro: {new Date(order.pickedUpAt).toLocaleString()}
          </p>
        </div>
      )}

      {order.items.map(item => (
        <div key={item.productId} className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-medium text-gray-900 mb-4">{item.productName}</h3>
          
          <OrderQuantityManager
            item={item}
            onQuantityUpdate={(completed) => handleQuantityUpdate(item.productId, completed)}
          />

          <OrderLotManager
            productId={item.productId}
            productName={item.productName}
            lots={item.lots || []}
            onUpdateLots={(lots) => handleLotUpdate(item.productId, lots)}
          />
        </div>
      ))}
    </div>
  );
}