import { useEffect } from 'react';
import { ref, onValue, set } from 'firebase/database';
import { db } from '../config/firebase';

export function useRealtimeSync<T>(path: string, data: T, onUpdate: (data: T) => void) {
  useEffect(() => {
    // Listen for changes
    const dbRef = ref(db, path);
    const unsubscribe = onValue(dbRef, (snapshot) => {
      const value = snapshot.val();
      if (value) {
        onUpdate(value);
      }
    });

    // Sync local changes to Firebase
    set(dbRef, data);

    return () => unsubscribe();
  }, [path, data]);
}