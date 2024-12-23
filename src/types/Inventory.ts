export interface InventoryMovement {
  id: string;
  date: string;
  type: 'in' | 'out';
  productId: string;
  quantity: number;
  note?: string;
}

export interface InventoryState {
  [productId: string]: number; // quantità attuale
}