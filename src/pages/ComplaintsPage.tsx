import React, { useState } from 'react';
import { AlertTriangle, Plus } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useComplaints } from '../hooks/useComplaints';
import ComplaintsList from '../components/Complaints/ComplaintsList';
import NewComplaintForm from '../components/Complaints/NewComplaintForm';

export default function ComplaintsPage() {
  const { user } = useAuth();
  const { complaints, createComplaint, updateComplaintStatus, deleteComplaint } = useComplaints();
  const [showNewComplaint, setShowNewComplaint] = useState(false);
  const isAdmin = user?.role === 'admin';

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <AlertTriangle className="h-8 w-8 text-red-600 mr-2" />
            <h1 className="text-2xl font-bold text-gray-900">Reclami Clienti</h1>
          </div>
          {isAdmin && (
            <button
              onClick={() => setShowNewComplaint(true)}
              className="flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              <Plus className="h-5 w-5 mr-2" />
              Nuovo Reclamo
            </button>
          )}
        </div>

        <ComplaintsList
          complaints={complaints}
          isAdmin={isAdmin}
          onUpdateStatus={updateComplaintStatus}
          onDelete={deleteComplaint}
        />

        {showNewComplaint && (
          <NewComplaintForm
            onSubmit={(data) => {
              createComplaint(data);
              setShowNewComplaint(false);
            }}
            onClose={() => setShowNewComplaint(false)}
          />
        )}
      </div>
    </div>
  );
}