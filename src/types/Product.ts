export interface Product {
  id: string;
  name: string;
  boxesPerBatch: number;
  ingredients: {
    flour: { amount: number; type: string; };
    eggs: number;
    sugar: number;
    salt: number;
    yeast: number;
    margarine: number;
    e202: number;
    oil: number;
  };
}

export interface ProductQuantity {
  boxes: number;
  batches: number;
}