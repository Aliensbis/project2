import React from 'react';
import { Printer } from 'lucide-react';
import { Order, Customer } from '../../../types/Order';
import { generateOrderPDF } from '../../../utils/orderPrinter';

interface OrderPrintButtonProps {
  order: Order;
  customer: Customer;
}

export default function OrderPrintButton({ order, customer }: OrderPrintButtonProps) {
  return (
    <button
      onClick={() => generateOrderPDF(order, customer)}
      className="flex items-center px-3 py-1.5 text-sm bg-green-600 text-white rounded hover:bg-green-700"
    >
      <Printer className="h-4 w-4 mr-2" />
      Stampa Ordine
    </button>
  );
}