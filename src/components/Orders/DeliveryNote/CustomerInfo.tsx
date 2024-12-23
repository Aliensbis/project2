import React from 'react';
import { Customer } from '../../../types/Order';

interface CustomerInfoProps {
  customer: Customer;
}

export default function CustomerInfo({ customer }: CustomerInfoProps) {
  return (
    <div className="space-y-6">
      <div className="border rounded p-3">
        <h3 className="font-semibold mb-2">Destinazione Merce</h3>
        <div className="text-sm">
          <p>{customer.name}</p>
          <p>{customer.address}</p>
        </div>
      </div>

      <div className="border rounded p-3">
        <h3 className="font-semibold mb-2">Cliente</h3>
        <div className="text-sm">
          <p>{customer.name}</p>
          <p>{customer.address}</p>
        </div>
      </div>
    </div>
  );
}