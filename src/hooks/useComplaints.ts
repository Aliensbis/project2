import { useState, useEffect } from 'react';
import { Complaint, ComplaintStatus } from '../types/Complaint';
import { useNotifications } from './useNotifications';
import { useLocalStorage } from './useLocalStorage';

export function useComplaints() {
  const [complaints, setComplaints] = useLocalStorage<Complaint[]>('complaints', []);
  const [hasNewComplaints, setHasNewComplaints] = useState(false);
  const { addNotification } = useNotifications('system');

  useEffect(() => {
    const unreadComplaints = complaints.some(c => c.status === 'pending');
    setHasNewComplaints(unreadComplaints);
  }, [complaints]);

  const createComplaint = (data: Omit<Complaint, 'id' | 'createdAt' | 'updatedAt' | 'status'>) => {
    const newComplaint: Complaint = {
      ...data,
      id: Date.now().toString(),
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    setComplaints(prev => [newComplaint, ...prev]);

    // Notify production about new complaint
    addNotification({
      userId: 'production',
      title: 'Nuovo Reclamo',
      message: `È stato registrato un nuovo reclamo di gravità ${data.severity.toUpperCase()}`,
      type: 'complaint',
      complaintId: newComplaint.id
    });

    return newComplaint;
  };

  const updateComplaintStatus = (id: string, status: ComplaintStatus, resolution?: string) => {
    setComplaints(prev => prev.map(complaint => {
      if (complaint.id !== id) return complaint;

      const updatedComplaint = {
        ...complaint,
        status,
        resolution,
        updatedAt: new Date().toISOString()
      };

      // Notify admin about status changes
      addNotification({
        userId: 'admin',
        title: 'Aggiornamento Reclamo',
        message: `Lo stato del reclamo #${id} è stato aggiornato a ${
          status === 'resolved' ? 'RISOLTO' :
          status === 'in-progress' ? 'IN GESTIONE' : 'IN ATTESA'
        }`,
        type: 'complaint',
        complaintId: id
      });

      return updatedComplaint;
    }));
  };

  const deleteComplaint = (id: string) => {
    setComplaints(prev => prev.filter(complaint => complaint.id !== id));
  };

  return {
    complaints,
    hasNewComplaints,
    createComplaint,
    updateComplaintStatus,
    deleteComplaint
  };
}