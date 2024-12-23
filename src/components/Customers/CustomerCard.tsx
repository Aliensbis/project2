import React from 'react';
import { Edit2, Trash2, MapPin, Phone, Mail } from 'lucide-react';
import { Customer } from '../../types/Order';

interface CustomerCardProps {
  customer: Customer;
  onEdit: () => void;
  onDelete: () => void;
}

export default function CustomerCard({ customer, onEdit, onDelete }: CustomerCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{customer.name}</h3>
        <div className="flex space-x-2">
          <button
            onClick={onEdit}
            className="p-1 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded"
          >
            <Edit2 className="h-4 w-4" />
          </button>
          <button
            onClick={onDelete}
            className="p-1 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="space-y-2">
        {customer.address && (
          <div className="flex items-center text-gray-600">
            <MapPin className="h-4 w-4 mr-2" />
            {customer.address}
          </div>
        )}
        {customer.phone && (
          <div className="flex items-center text-gray-600">
            <Phone className="h-4 w-4 mr-2" />
            {customer.phone}
          </div>
        )}
        {customer.email && (
          <div className="flex items-center text-gray-600">
            <Mail className="h-4 w-4 mr-2" />
            {customer.email}
          </div>
        )}
      </div>
    </div>
  );
}