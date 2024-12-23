import React from 'react';
import { OrderItem } from '../../../types/Order';

interface ProductsTableProps {
  items: OrderItem[];
}

export default function ProductsTable({ items }: ProductsTableProps) {
  return (
    <table className="w-full">
      <thead className="bg-gray-50">
        <tr>
          <th className="text-left p-2">Codice</th>
          <th className="text-left p-2">Descrizione</th>
          <th className="text-center p-2">u.m.</th>
          <th className="text-right p-2">Quantità</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item, index) => (
          <tr key={index} className="border-t">
            <td className="p-2">{item.productId}</td>
            <td className="p-2">
              {item.productName}
              {item.lots?.map(lot => (
                <div key={lot.number} className="text-sm text-gray-600">
                  Lotto: {lot.number} S. {new Date(lot.productionDate).toLocaleDateString()} ({lot.boxes})
                </div>
              ))}
            </td>
            <td className="text-center p-2">CT</td>
            <td className="text-right p-2">{item.boxes}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}