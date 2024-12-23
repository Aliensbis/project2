export type Status = 'pending' | 'in-progress' | 'completed' | 'shipped' | 'cancelled';

export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface Ingredient {
  flour: { amount: number; type: string };
  eggs: number;
  sugar: number;
  salt: number;
  yeast: number;
  margarine: number;
  e202: number;
  oil: number;
}

export interface ProductionQuantity {
  boxes: number;
  batches: number;
}