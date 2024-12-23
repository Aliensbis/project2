import React from 'react';
import { Package, Truck, Clock, CheckCircle } from 'lucide-react';
import { Order } from '../../types/Order';
import { calculateOrderSummary } from '../../utils/orderUtils';

interface OrderStatsProps {
  orders: Order[];
}

export default function OrderStats({ orders }: OrderStatsProps) {
  const summary = calculateOrderSummary(orders);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
      <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Ordini Totali</p>
            <p className="text-2xl font-bold text-gray-900">{summary.totalOrders}</p>
          </div>
          <Package className="h-8 w-8 text-indigo-600" />
        </div>
        <p className="mt-2 text-sm text-gray-600">
          {summary.totalBoxes} cartoni - {summary.totalPallets} pedane
        </p>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">In Lavorazione</p>
            <p className="text-2xl font-bold text-blue-600">
              {summary.ordersByStatus['in-progress']}
            </p>
          </div>
          <Clock className="h-8 w-8 text-blue-600" />
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Completati</p>
            <p className="text-2xl font-bold text-green-600">
              {summary.ordersByStatus.completed}
            </p>
          </div>
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Pronti per il Ritiro</p>
            <p className="text-2xl font-bold text-orange-600">
              {summary.ordersByStatus['ready-for-pickup']}
            </p>
          </div>
          <Package className="h-8 w-8 text-orange-600" />
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Spediti</p>
            <p className="text-2xl font-bold text-purple-600">
              {summary.ordersByStatus.shipped}
            </p>
          </div>
          <Truck className="h-8 w-8 text-purple-600" />
        </div>
      </div>
    </div>
  );
}