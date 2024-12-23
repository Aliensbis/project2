import React, { useState } from 'react';
import { Calculator } from 'lucide-react';
import { products } from '../data/products';
import { ProductQuantity } from '../types/Product';
import ProductionTable from '../components/ProductionTable';
import SaveProductionForm from '../components/ProductionTable/SaveProductionForm';
import { useProduction } from '../hooks/useProduction';

export default function ProductionPage() {
  const [quantities, setQuantities] = useState<Record<string, ProductQuantity>>({});
  const { addProduction } = useProduction();

  const handleQuantityChange = (productId: string, field: keyof ProductQuantity, value: number) => {
    setQuantities(prev => ({
      ...prev,
      [productId]: {
        ...prev[productId],
        [field]: value
      }
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center mb-8">
          <Calculator className="h-8 w-8 text-blue-600 mr-2" />
          <h1 className="text-2xl font-bold text-gray-900">
            Calcolo Produzione
          </h1>
        </div>

        <ProductionTable
          products={products}
          quantities={quantities}
          onQuantityChange={handleQuantityChange}
        />

        <SaveProductionForm
          products={products}
          quantities={quantities}
          onSave={addProduction}
        />
      </div>
    </div>
  );
}