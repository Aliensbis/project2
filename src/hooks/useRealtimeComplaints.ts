import { useEffect, useCallback } from 'react';
import { ref, onValue, push, set, remove } from 'firebase/database';
import { db } from '../config/firebase';
import { Complaint } from '../types/Complaint';

export function useRealtimeComplaints() {
  const [complaints, setComplaints] = useState<Complaint[]>([]);

  useEffect(() => {
    const complaintsRef = ref(db, 'complaints');
    const unsubscribe = onValue(complaintsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setComplaints(Object.values(data));
      }
    });

    return () => unsubscribe();
  }, []);

  const addComplaint = useCallback((complaint: Omit<Complaint, 'id'>) => {
    const complaintsRef = ref(db, 'complaints');
    const newRef = push(complaintsRef);
    set(newRef, { ...complaint, id: newRef.key });
  }, []);

  const updateComplaint = useCallback((id: string, updates: Partial<Complaint>) => {
    set(ref(db, `complaints/${id}`), updates);
  }, []);

  const deleteComplaint = useCallback((id: string) => {
    remove(ref(db, `complaints/${id}`));
  }, []);

  return { complaints, addComplaint, updateComplaint, deleteComplaint };
}