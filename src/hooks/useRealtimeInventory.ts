import { useEffect, useCallback } from 'react';
import { ref, onValue, set } from 'firebase/database';
import { db } from '../config/firebase';
import { InventoryMovement, InventoryState } from '../types/Inventory';

export function useRealtimeInventory() {
  const [movements, setMovements] = useState<InventoryMovement[]>([]);
  const [state, setState] = useState<InventoryState>({});

  useEffect(() => {
    const movementsRef = ref(db, 'inventory/movements');
    const stateRef = ref(db, 'inventory/state');

    const unsubscribeMovements = onValue(movementsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) setMovements(Object.values(data));
    });

    const unsubscribeState = onValue(stateRef, (snapshot) => {
      const data = snapshot.val();
      if (data) setState(data);
    });

    return () => {
      unsubscribeMovements();
      unsubscribeState();
    };
  }, []);

  const addMovement = useCallback((movement: Omit<InventoryMovement, 'id'>) => {
    const movementsRef = ref(db, 'inventory/movements');
    const newRef = push(movementsRef);
    const newMovement = { ...movement, id: newRef.key };
    
    set(newRef, newMovement);
    set(ref(db, `inventory/state/${movement.productId}`), 
      (state[movement.productId] || 0) + (movement.type === 'in' ? movement.quantity : -movement.quantity)
    );
  }, [state]);

  return { movements, state, addMovement };
}