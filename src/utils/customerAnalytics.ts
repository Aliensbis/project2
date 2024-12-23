import { Order } from '../types/Order';

export interface CustomerAnalytics {
  weekly: {
    boxes: number;
    orders: number;
    revenue?: number;
    trend: number; // percentage change from previous week
  };
  monthly: {
    boxes: number;
    orders: number;
    revenue?: number;
    trend: number;
  };
  yearly: {
    boxes: number;
    orders: number;
    revenue?: number;
    trend: number;
  };
  rank: {
    tier: 'Premium' | 'Gold' | 'Silver' | 'Bronze';
    color: string;
    percentile: number;
  };
}

export function calculateCustomerAnalytics(orders: Order[], allOrders: Order[]): CustomerAnalytics {
  const now = new Date();
  const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const oneMonthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
  const oneYearAgo = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());

  // Weekly calculations
  const weeklyOrders = orders.filter(o => new Date(o.date) >= oneWeekAgo);
  const previousWeekOrders = orders.filter(o => {
    const date = new Date(o.date);
    return date >= new Date(oneWeekAgo.getTime() - 7 * 24 * 60 * 60 * 1000) && date < oneWeekAgo;
  });

  // Monthly calculations
  const monthlyOrders = orders.filter(o => new Date(o.date) >= oneMonthAgo);
  const previousMonthOrders = orders.filter(o => {
    const date = new Date(o.date);
    return date >= new Date(oneMonthAgo.getTime() - 30 * 24 * 60 * 60 * 1000) && date < oneMonthAgo;
  });

  // Yearly calculations
  const yearlyOrders = orders.filter(o => new Date(o.date) >= oneYearAgo);
  const previousYearOrders = orders.filter(o => {
    const date = new Date(o.date);
    return date >= new Date(oneYearAgo.getTime() - 365 * 24 * 60 * 60 * 1000) && date < oneYearAgo;
  });

  // Calculate total boxes for each period
  const calculateBoxes = (ordersList: Order[]) => 
    ordersList.reduce((sum, order) => 
      sum + order.items.reduce((itemSum, item) => itemSum + item.boxes, 0), 0);

  // Calculate trends
  const calculateTrend = (current: number, previous: number) => 
    previous === 0 ? 100 : ((current - previous) / previous) * 100;

  // Calculate rank based on yearly boxes
  const calculateRank = (totalBoxes: number) => {
    const allCustomerBoxes = new Set(
      allOrders.map(o => o.customerId).map(customerId => 
        calculateBoxes(allOrders.filter(o => o.customerId === customerId))
      )
    );
    const sortedBoxes = Array.from(allCustomerBoxes).sort((a, b) => b - a);
    const position = sortedBoxes.indexOf(totalBoxes);
    const percentile = ((sortedBoxes.length - position) / sortedBoxes.length) * 100;

    if (percentile >= 90) return { tier: 'Premium' as const, color: 'text-purple-600', percentile };
    if (percentile >= 75) return { tier: 'Gold' as const, color: 'text-yellow-600', percentile };
    if (percentile >= 50) return { tier: 'Silver' as const, color: 'text-gray-600', percentile };
    return { tier: 'Bronze' as const, color: 'text-orange-600', percentile };
  };

  const weeklyBoxes = calculateBoxes(weeklyOrders);
  const monthlyBoxes = calculateBoxes(monthlyOrders);
  const yearlyBoxes = calculateBoxes(yearlyOrders);

  return {
    weekly: {
      boxes: weeklyBoxes,
      orders: weeklyOrders.length,
      trend: calculateTrend(weeklyBoxes, calculateBoxes(previousWeekOrders))
    },
    monthly: {
      boxes: monthlyBoxes,
      orders: monthlyOrders.length,
      trend: calculateTrend(monthlyBoxes, calculateBoxes(previousMonthOrders))
    },
    yearly: {
      boxes: yearlyBoxes,
      orders: yearlyOrders.length,
      trend: calculateTrend(yearlyBoxes, calculateBoxes(previousYearOrders))
    },
    rank: calculateRank(yearlyBoxes)
  };
}