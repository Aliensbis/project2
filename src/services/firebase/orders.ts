import { ref, push, set, update, remove, onValue, query, orderByChild } from 'firebase/database';
import { db } from '../../config/firebase';
import { Order } from '../../types/Order';

export function subscribeToOrders(onUpdate: (orders: Order[]) => void) {
  const ordersRef = ref(db, 'orders');
  const ordersQuery = query(ordersRef, orderByChild('createdAt'));
  
  return onValue(ordersQuery, (snapshot) => {
    const orders: Order[] = [];
    snapshot.forEach((child) => {
      orders.push({ id: child.key!, ...child.val() });
    });
    onUpdate(orders.reverse());
  });
}

export function createOrder(order: Omit<Order, 'id'>) {
  const ordersRef = ref(db, 'orders');
  const newOrderRef = push(ordersRef);
  return set(newOrderRef, {
    ...order,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  });
}

export function updateOrder(id: string, updates: Partial<Order>) {
  const orderRef = ref(db, `orders/${id}`);
  return update(orderRef, {
    ...updates,
    updatedAt: new Date().toISOString()
  });
}

export function deleteOrder(id: string) {
  const orderRef = ref(db, `orders/${id}`);
  return remove(orderRef);
}