import { useState, useEffect } from 'react';
import { InventoryMovement, InventoryState } from '../types/Inventory';

export function useInventory() {
  const [movements, setMovements] = useState<InventoryMovement[]>(() => {
    const stored = localStorage.getItem('inventory_movements');
    return stored ? JSON.parse(stored) : [];
  });

  const [state, setState] = useState<InventoryState>(() => {
    const stored = localStorage.getItem('inventory_state');
    return stored ? JSON.parse(stored) : {};
  });

  useEffect(() => {
    localStorage.setItem('inventory_movements', JSON.stringify(movements));
    localStorage.setItem('inventory_state', JSON.stringify(state));
  }, [movements, state]);

  const addMovement = (movement: Omit<InventoryMovement, 'id'>) => {
    const newMovement = {
      ...movement,
      id: Date.now().toString(),
    };

    setMovements(prev => [...prev, newMovement]);
    setState(prev => ({
      ...prev,
      [movement.productId]: (prev[movement.productId] || 0) + 
        (movement.type === 'in' ? movement.quantity : -movement.quantity)
    }));
  };

  const getCurrentStock = (productId: string): number => {
    return state[productId] || 0;
  };

  return {
    movements,
    addMovement,
    getCurrentStock,
  };
}