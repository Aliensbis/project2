import { Order } from '../types/Order';

export interface OrderSummary {
  totalOrders: number;
  totalBoxes: number;
  totalPallets: number;
  ordersByStatus: {
    pending: number;
    'in-progress': number;
    completed: number;
    'ready-for-pickup': number;
    shipped: number;
    cancelled: number;
  };
}

export function calculateOrderSummary(orders: Order[]): OrderSummary {
  const summary: OrderSummary = {
    totalOrders: orders.length,
    totalBoxes: 0,
    totalPallets: 0,
    ordersByStatus: {
      pending: 0,
      'in-progress': 0,
      completed: 0,
      'ready-for-pickup': 0,
      shipped: 0,
      cancelled: 0
    }
  };

  orders.forEach(order => {
    // Calculate totals
    summary.totalBoxes += order.items.reduce((sum, item) => sum + item.boxes, 0);
    summary.totalPallets += order.totalPallets;

    // Count orders by status
    if (order.status in summary.ordersByStatus) {
      summary.ordersByStatus[order.status]++;
    }
  });

  return summary;
}