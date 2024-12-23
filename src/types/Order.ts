export interface OrderItem {
  productId: string;
  productName: string;
  boxes: number;
  completed: number;
  lots?: Array<{
    number: string;
    productionDate: string;
    boxes: number;
  }>;
}

export type OrderStatus = 'pending' | 'in-progress' | 'completed' | 'ready-for-pickup' | 'shipped' | 'picked-up' | 'cancelled';

export interface Order {
  id: string;
  customerId: string;
  agentId?: string;
  items: OrderItem[];
  status: OrderStatus;
  date: string;
  notes?: string;
  totalPallets: number;
  createdAt: string;
  updatedAt: string;
  pickedUpBy?: string;
  pickedUpAt?: string;
}