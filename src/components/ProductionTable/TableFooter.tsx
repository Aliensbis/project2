import React from 'react';
import { Product, ProductQuantity } from '../../types/Product';
import { calculateIngredientTotal, calculateFlourByType, calculateBags, calculateEggCartons } from '../../utils/calculations';

interface TableFooterProps {
  products: Product[];
  quantities: Record<string, ProductQuantity>;
}

export default function TableFooter({ products, quantities }: TableFooterProps) {
  const flourTotal = calculateIngredientTotal(products, quantities, 'flour');
  const eggsTotal = calculateIngredientTotal(products, quantities, 'eggs');
  const sugarTotal = calculateIngredientTotal(products, quantities, 'sugar');
  const saltTotal = calculateIngredientTotal(products, quantities, 'salt');
  const yeastTotal = calculateIngredientTotal(products, quantities, 'yeast');
  const margarineTotal = calculateIngredientTotal(products, quantities, 'margarine');
  const e202Total = calculateIngredientTotal(products, quantities, 'e202');
  const oilTotal = calculateIngredientTotal(products, quantities, 'oil');

  const flourByType = calculateFlourByType(products, quantities);
  const eggCartons = calculateEggCartons(eggsTotal);

  return (
    <tfoot className="bg-gray-50">
      <tr>
        <td colSpan={3} className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
          Totali
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
          {flourTotal.toFixed(3)}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
          {eggsTotal.toFixed(3)}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
          {sugarTotal.toFixed(3)}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
          {saltTotal.toFixed(3)}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
          {yeastTotal.toFixed(3)}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
          {margarineTotal.toFixed(3)}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
          {e202Total.toFixed(3)}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
          {oilTotal.toFixed(3)}
        </td>
      </tr>
      {Object.entries(flourByType).map(([type, amount]) => (
        <tr key={type}>
          <td colSpan={3} className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
            Farina {type}
          </td>
          <td colSpan={8} className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
            {calculateBags(amount)} sacchi
          </td>
        </tr>
      ))}
      <tr>
        <td colSpan={3} className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
          Cartoni di Uova
        </td>
        <td colSpan={8} className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
          {eggCartons} cartoni
        </td>
      </tr>
    </tfoot>
  );
}