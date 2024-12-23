import { useEffect, useCallback } from 'react';
import { ref, onValue, push, set } from 'firebase/database';
import { db } from '../config/firebase';
import { ProductionEntry } from '../types/Production';

export function useRealtimeProduction() {
  const [productions, setProductions] = useState<ProductionEntry[]>([]);

  useEffect(() => {
    const productionsRef = ref(db, 'productions');
    const unsubscribe = onValue(productionsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) setProductions(Object.values(data));
    });

    return () => unsubscribe();
  }, []);

  const addProduction = useCallback((production: Omit<ProductionEntry, 'id'>) => {
    const productionsRef = ref(db, 'productions');
    const newRef = push(productionsRef);
    set(newRef, { ...production, id: newRef.key });
  }, []);

  return { productions, addProduction };
}