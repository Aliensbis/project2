import React from 'react';
import { Complaint } from '../../types/Complaint';
import ComplaintCard from './ComplaintCard';

interface ComplaintsListProps {
  complaints: Complaint[];
  isAdmin: boolean;
  onUpdateStatus: (id: string, status: Complaint['status'], resolution?: string) => void;
  onDelete: (id: string) => void;
}

export default function ComplaintsList({
  complaints,
  isAdmin,
  onUpdateStatus,
  onDelete
}: ComplaintsListProps) {
  if (complaints.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg shadow-md">
        <p className="text-gray-500">Nessun reclamo trovato</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {complaints.map(complaint => (
        <ComplaintCard
          key={complaint.id}
          complaint={complaint}
          isAdmin={isAdmin}
          onUpdateStatus={onUpdateStatus}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}