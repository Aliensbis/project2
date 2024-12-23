import { useState, useEffect, useCallback } from 'react';
import { Order } from '../types/Order';
import { subscribeToOrders, createOrder, updateOrder, deleteOrder } from '../services/firebase/orders';

export function useRealtimeOrders() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const unsubscribe = subscribeToOrders(setOrders);
    return () => unsubscribe();
  }, []);

  const addOrder = useCallback((order: Omit<Order, 'id'>) => {
    return createOrder(order);
  }, []);

  const updateOrderStatus = useCallback((id: string, updates: Partial<Order>) => {
    return updateOrder(id, updates);
  }, []);

  const removeOrder = useCallback((id: string) => {
    return deleteOrder(id);
  }, []);

  return {
    orders,
    addOrder,
    updateOrder: updateOrderStatus,
    deleteOrder: removeOrder
  };
}