import React from 'react';
import { FileText } from 'lucide-react';
import { Order, Customer } from '../../../types/Order';
import { generateDeliveryNote } from '../../../utils/deliveryNoteGenerator';

interface DeliveryNoteButtonProps {
  order: Order;
  customer: Customer;
}

export default function DeliveryNoteButton({ order, customer }: DeliveryNoteButtonProps) {
  const handleGenerateDeliveryNote = () => {
    generateDeliveryNote(order, customer);
  };

  return (
    <button
      onClick={handleGenerateDeliveryNote}
      className="flex items-center px-3 py-1.5 text-sm bg-green-600 text-white rounded hover:bg-green-700"
    >
      <FileText className="h-4 w-4 mr-2" />
      Genera DDT
    </button>
  );
}