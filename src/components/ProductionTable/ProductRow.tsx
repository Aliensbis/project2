import React from 'react';
import { Product, ProductQuantity } from '../../types/Product';
import { calculateBatchesFromBoxes, calculateBoxesFromBatches } from '../../utils/calculations';

interface ProductRowProps {
  product: Product;
  quantity: ProductQuantity;
  onQuantityChange: (field: keyof ProductQuantity, value: number) => void;
}

export default function ProductRow({ product, quantity, onQuantityChange }: ProductRowProps) {
  const handleBoxesChange = (value: number) => {
    const batches = calculateBatchesFromBoxes(value, product.boxesPerBatch);
    onQuantityChange('boxes', value);
    onQuantityChange('batches', batches);
  };

  const handleBatchesChange = (value: number) => {
    const boxes = calculateBoxesFromBatches(value, product.boxesPerBatch);
    onQuantityChange('batches', value);
    onQuantityChange('boxes', boxes);
  };

  return (
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {product.name}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <input
          type="number"
          min="0"
          value={quantity.boxes || ''}
          onChange={(e) => handleBoxesChange(parseInt(e.target.value) || 0)}
          className="w-24 px-3 py-2 text-blue-600 bg-blue-50 border-2 border-blue-200 rounded-md 
                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                   hover:bg-blue-100 transition-colors duration-200"
        />
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <input
          type="number"
          min="0"
          value={quantity.batches || ''}
          onChange={(e) => handleBatchesChange(parseInt(e.target.value) || 0)}
          className="w-24 px-3 py-2 text-blue-600 bg-blue-50 border-2 border-blue-200 rounded-md 
                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                   hover:bg-blue-100 transition-colors duration-200"
        />
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {(product.ingredients.flour.amount * (quantity.batches || 0)).toFixed(3)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {(product.ingredients.eggs * (quantity.batches || 0)).toFixed(3)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {(product.ingredients.sugar * (quantity.batches || 0)).toFixed(3)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {(product.ingredients.salt * (quantity.batches || 0)).toFixed(3)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {(product.ingredients.yeast * (quantity.batches || 0)).toFixed(3)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {(product.ingredients.margarine * (quantity.batches || 0)).toFixed(3)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {(product.ingredients.e202 * (quantity.batches || 0)).toFixed(3)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {(product.ingredients.oil * (quantity.batches || 0)).toFixed(3)}
      </td>
    </tr>
  );
}