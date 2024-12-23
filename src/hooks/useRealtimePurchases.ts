import { useEffect, useCallback } from 'react';
import { ref, onValue, push, set, remove } from 'firebase/database';
import { db } from '../config/firebase';
import { PurchaseList } from '../types/Purchase';

export function useRealtimePurchases() {
  const [lists, setLists] = useState<PurchaseList[]>([]);

  useEffect(() => {
    const listsRef = ref(db, 'purchases');
    const unsubscribe = onValue(listsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) setLists(Object.values(data));
    });

    return () => unsubscribe();
  }, []);

  const createList = useCallback((list: Omit<PurchaseList, 'id'>) => {
    const listsRef = ref(db, 'purchases');
    const newRef = push(listsRef);
    set(newRef, { ...list, id: newRef.key });
  }, []);

  const updateList = useCallback((id: string, updates: Partial<PurchaseList>) => {
    set(ref(db, `purchases/${id}`), updates);
  }, []);

  const deleteList = useCallback((id: string) => {
    remove(ref(db, `purchases/${id}`));
  }, []);

  return { lists, createList, updateList, deleteList };
}