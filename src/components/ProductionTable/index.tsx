import React from 'react';
import { Product, ProductQuantity } from '../../types/Product';
import TableHeader from './TableHeader';
import ProductRow from './ProductRow';
import TableFooter from './TableFooter';

interface ProductionTableProps {
  products: Product[];
  quantities: Record<string, ProductQuantity>;
  onQuantityChange: (productId: string, field: keyof ProductQuantity, value: number) => void;
}

export default function ProductionTable({ products, quantities, onQuantityChange }: ProductionTableProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <TableHeader />
        <tbody className="bg-white divide-y divide-gray-200">
          {products.map((product) => (
            <ProductRow
              key={product.id}
              product={product}
              quantity={quantities[product.id] || { boxes: 0, batches: 0 }}
              onQuantityChange={(field, value) => onQuantityChange(product.id, field, value)}
            />
          ))}
        </tbody>
        <TableFooter products={products} quantities={quantities} />
      </table>
    </div>
  );
}