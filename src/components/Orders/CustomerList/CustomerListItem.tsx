import React from 'react';
import { User } from 'lucide-react';
import { Customer, CustomerStats } from '../../../types/Order';
import { getCustomerTier } from '../../../utils/customerUtils';

interface CustomerListItemProps {
  customer: Customer;
  stats: CustomerStats;
  isSelected: boolean;
  onSelect: () => void;
  onDelete: () => void;
}

export default function CustomerListItem({
  customer,
  stats,
  isSelected,
  onSelect,
  onDelete
}: CustomerListItemProps) {
  const tier = getCustomerTier(stats.totalOrders);

  return (
    <div
      className={`p-4 cursor-pointer ${
        isSelected ? 'bg-indigo-50' : 'hover:bg-gray-50'
      }`}
      onClick={onSelect}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <User className="h-5 w-5 text-gray-400" />
          <div>
            <h4 className="font-medium text-gray-900">{customer.name}</h4>
            <div className="flex items-center space-x-2">
              <span className={`text-sm ${tier.color}`}>
                {tier.label}
              </span>
              <span className="text-sm text-gray-500">
                {stats.totalOrders} ordini
              </span>
            </div>
          </div>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (window.confirm('Sei sicuro di voler eliminare questo cliente?')) {
              onDelete();
            }
          }}
          className="text-red-600 hover:text-red-700 text-sm"
        >
          Elimina
        </button>
      </div>
    </div>
  );
}