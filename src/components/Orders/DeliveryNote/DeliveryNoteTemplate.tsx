import React from 'react';
import { Order, Customer } from '../../../types/Order';
import CompanyInfo from './CompanyInfo';
import CustomerInfo from './CustomerInfo';
import DocumentInfo from './DocumentInfo';
import TransportDetails from './TransportDetails';
import ProductsTable from './ProductsTable';
import DeliveryFooter from './DeliveryFooter';

interface DeliveryNoteTemplateProps {
  order: Order;
  customer: Customer;
}

export default function DeliveryNoteTemplate({ order, customer }: DeliveryNoteTemplateProps) {
  return (
    <div className="max-w-4xl mx-auto bg-white p-8 shadow-lg">
      <div className="grid grid-cols-2 gap-8 mb-8">
        <CompanyInfo />
        <CustomerInfo customer={customer} />
      </div>

      <div className="mb-8">
        <DocumentInfo 
          id={order.id} 
          date={order.date} 
          vatNumber={customer.vatNumber} 
        />
      </div>

      <div className="mb-8">
        <TransportDetails 
          reference={order.reference} 
          notes={order.notes} 
        />
      </div>

      <div className="mb-8">
        <ProductsTable items={order.items} />
      </div>

      <DeliveryFooter totalPallets={order.totalPallets} />
    </div>
  );
}