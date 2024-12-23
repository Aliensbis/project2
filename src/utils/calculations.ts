import { Product, ProductQuantity } from '../types/Product';

export const calculateBatchesFromBoxes = (boxes: number, boxesPerBatch: number): number => {
  return Math.ceil(boxes / boxesPerBatch);
};

export const calculateBoxesFromBatches = (batches: number, boxesPerBatch: number): number => {
  return batches * boxesPerBatch;
};

export const calculateIngredientTotal = (
  products: Product[],
  quantities: Record<string, ProductQuantity>,
  ingredient: keyof Product['ingredients']
): number => {
  return products.reduce((total, product) => {
    const qty = quantities[product.id]?.batches || 0;
    if (ingredient === 'flour') {
      return total + (product.ingredients.flour.amount * qty);
    }
    return total + (product.ingredients[ingredient] * qty);
  }, 0);
};

export const calculateFlourByType = (
  products: Product[],
  quantities: Record<string, ProductQuantity>
): Record<string, number> => {
  return products.reduce((acc, product) => {
    const qty = quantities[product.id]?.batches || 0;
    const type = product.ingredients.flour.type;
    const amount = product.ingredients.flour.amount * qty;
    return {
      ...acc,
      [type]: (acc[type] || 0) + amount
    };
  }, {} as Record<string, number>);
};

export const calculateBags = (flourAmount: number): number => {
  return Math.ceil(flourAmount / 25);
};

export const calculateEggCartons = (eggsAmount: number): number => {
  return Math.ceil(eggsAmount / 20);
};