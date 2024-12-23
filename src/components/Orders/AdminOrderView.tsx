import React from 'react';
import { Order, Customer } from '../../types/Order';
import OrderLotViewer from './OrderLotViewer';
import OrderPrintButton from './PrintOrder/OrderPrintButton';
import DeliveryNoteButton from './DeliveryNote/DeliveryNoteButton';

interface AdminOrderViewProps {
  order: Order;
  customer: Customer;
}

export default function AdminOrderView({ order, customer }: AdminOrderViewProps) {
  const totalBoxes = order.items.reduce((sum, item) => sum + item.boxes, 0);
  const completedBoxes = order.items.reduce((sum, item) => sum + (item.completed || 0), 0);

  const showPrintButtons = order.status !== 'pending' && order.status !== 'cancelled';
  const showDeliveryNote = order.status === 'completed' || order.status === 'ready-for-pickup' || order.status === 'shipped';

  return (
    <div className="space-y-6">
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-medium text-gray-900">Dettagli Ordine</h3>
          {showPrintButtons && (
            <div className="flex space-x-2">
              <OrderPrintButton order={order} customer={customer} />
              {showDeliveryNote && (
                <DeliveryNoteButton order={order} customer={customer} />
              )}
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-sm text-gray-600">Stato</p>
            <p className="font-medium">{order.status}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Avanzamento</p>
            <p className="font-medium">{completedBoxes} / {totalBoxes} cartoni</p>
          </div>
        </div>

        {order.notes && (
          <div className="mt-4 p-3 bg-gray-50 rounded">
            <p className="text-sm text-gray-600">Note</p>
            <p className="text-sm">{order.notes}</p>
          </div>
        )}
      </div>

      {order.items.map(item => (
        <div key={item.productId} className="bg-white p-4 rounded-lg shadow">
          <h4 className="font-medium text-gray-900 mb-4">{item.productName}</h4>
          
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">Avanzamento</span>
              <span className="text-sm">
                {item.completed} / {item.boxes} cartoni
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all"
                style={{ width: `${(item.completed / item.boxes) * 100}%` }}
              />
            </div>
          </div>

          {item.lots && item.lots.length > 0 && (
            <OrderLotViewer lots={item.lots} />
          )}
        </div>
      ))}
    </div>
  );
}