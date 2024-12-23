import { useState, useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { Order, Customer } from '../types/Order';

export function useOrders() {
  const [orders, setOrders] = useLocalStorage<Order[]>('orders', []);
  const [customers] = useLocalStorage<Customer[]>('customers', []);

  const addOrder = useCallback((orderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newOrder: Order = {
      ...orderData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setOrders(prev => [newOrder, ...prev]);
    return newOrder;
  }, [setOrders]);

  const updateOrder = useCallback((orderId: string, updates: Partial<Order>) => {
    setOrders(prev => prev.map(order => {
      if (order.id === orderId) {
        return {
          ...order,
          ...updates,
          updatedAt: new Date().toISOString()
        };
      }
      return order;
    }));
  }, [setOrders]);

  const deleteOrder = useCallback((orderId: string) => {
    setOrders(prev => prev.filter(order => order.id !== orderId));
  }, [setOrders]);

  return {
    orders,
    customers,
    addOrder,
    updateOrder,
    deleteOrder
  };
}