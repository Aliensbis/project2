import { Order, CustomerStats } from '../types/Order';

export const calculateCustomerStats = (orders: Order[]): CustomerStats => {
  const sortedOrders = [...orders].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const totalOrders = orders.length;
  const completedOrders = orders.filter(o => 
    o.status === 'completed' || o.status === 'shipped'
  ).length;
  const cancelledOrders = orders.filter(o => o.status === 'cancelled').length;
  
  const totalBoxes = orders.reduce((sum, order) => 
    sum + order.items.reduce((itemSum, item) => itemSum + item.boxes, 0), 0);
  const totalPallets = orders.reduce((sum, order) => sum + order.totalPallets, 0);
  
  const lastOrderDate = sortedOrders[0]?.date;

  // Calculate monthly trends for the last 6 months
  const now = new Date();
  const orderTrend = Array.from({ length: 6 }, (_, i) => {
    const monthDate = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const monthOrders = orders.filter(order => {
      const orderDate = new Date(order.date);
      return orderDate.getMonth() === monthDate.getMonth() && 
             orderDate.getFullYear() === monthDate.getFullYear();
    });

    const monthBoxes = monthOrders.reduce((sum, order) => 
      sum + order.items.reduce((itemSum, item) => itemSum + item.boxes, 0), 0);

    return {
      period: `${monthDate.getMonth() + 1}/${monthDate.getFullYear()}`,
      orders: monthOrders.length,
      boxes: monthBoxes
    };
  }).reverse();

  return {
    totalOrders,
    completedOrders,
    cancelledOrders,
    totalBoxes,
    totalPallets,
    lastOrderDate,
    orderTrend
  };
};

export const getCustomerTier = (totalOrders: number) => {
  if (totalOrders >= 100) {
    return { label: 'Premium', color: 'text-purple-600' };
  }
  if (totalOrders >= 50) {
    return { label: 'Gold', color: 'text-yellow-600' };
  }
  if (totalOrders >= 20) {
    return { label: 'Silver', color: 'text-gray-600' };
  }
  return { label: 'Bronze', color: 'text-orange-600' };
};