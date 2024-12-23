import React from 'react';
import { Clock, CheckCircle, Truck, Package, XCircle } from 'lucide-react';
import { Order } from '../../../types/Order';

interface OrderStatusBadgeProps {
  status: Order['status'];
}

export default function OrderStatusBadge({ status }: OrderStatusBadgeProps) {
  const getStatusConfig = () => {
    switch (status) {
      case 'pending':
        return {
          icon: Clock,
          text: 'In attesa',
          color: 'text-yellow-700 bg-yellow-50'
        };
      case 'in-progress':
        return {
          icon: Clock,
          text: 'In lavorazione',
          color: 'text-blue-700 bg-blue-50'
        };
      case 'completed':
        return {
          icon: CheckCircle,
          text: 'Completato',
          color: 'text-green-700 bg-green-50'
        };
      case 'ready-for-pickup':
        return {
          icon: Package,
          text: 'Pronto per il ritiro',
          color: 'text-orange-700 bg-orange-50'
        };
      case 'shipped':
        return {
          icon: Truck,
          text: 'Spedito',
          color: 'text-purple-700 bg-purple-50'
        };
      case 'cancelled':
        return {
          icon: XCircle,
          text: 'Annullato',
          color: 'text-red-700 bg-red-50'
        };
    }
  };

  const config = getStatusConfig();
  const Icon = config.icon;

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium ${config.color}`}>
      <Icon className="w-4 h-4 mr-1" />
      {config.text}
    </span>
  );
}