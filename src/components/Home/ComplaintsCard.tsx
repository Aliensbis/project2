import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, AlertCircle } from 'lucide-react';
import { useComplaints } from '../../hooks/useComplaints';
import { useAuth } from '../../hooks/useAuth';
import { formatDate } from '../../utils/dateUtils';

export default function ComplaintsCard() {
  const { complaints, hasNewComplaints } = useComplaints();
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';

  const pendingComplaints = complaints.filter(c => c.status === 'pending');
  const recentComplaints = complaints.slice(0, 3);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <AlertTriangle className="h-8 w-8 text-red-600 mr-2" />
          <h2 className="text-xl font-semibold">Reclami</h2>
          {hasNewComplaints && !isAdmin && (
            <span className="ml-2 h-2 w-2 bg-red-500 rounded-full animate-pulse" />
          )}
        </div>
        <Link
          to="/complaints"
          className="text-red-600 hover:text-red-700 text-sm font-medium"
        >
          Vedi tutti
        </Link>
      </div>

      <div className="space-y-4">
        {isAdmin ? (
          <>
            <div className="bg-red-50 p-4 rounded-lg">
              <div className="flex items-center text-red-600 mb-2">
                <AlertCircle className="h-5 w-5 mr-2" />
                <span className="font-medium">Reclami in Attesa</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">{pendingComplaints.length}</p>
              <p className="text-sm text-gray-600">da gestire</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3">Reclami Recenti</h3>
              <div className="space-y-2">
                {recentComplaints.map(complaint => (
                  <div key={complaint.id} className="bg-gray-50 p-3 rounded-lg">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-medium text-gray-900">
                        Cliente #{complaint.customerId}
                      </span>
                      <span className={`text-sm ${
                        complaint.severity === 'critical' ? 'text-red-600' :
                        complaint.severity === 'high' ? 'text-orange-600' :
                        complaint.severity === 'medium' ? 'text-yellow-600' :
                        'text-green-600'
                      }`}>
                        {complaint.severity.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-1">
                      {complaint.description}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {formatDate(complaint.createdAt)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="space-y-4">
            {recentComplaints.map(complaint => (
              <div key={complaint.id} className="bg-gray-50 p-3 rounded-lg">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-medium text-gray-900">
                    Cliente #{complaint.customerId}
                  </span>
                  <span className={`text-sm ${
                    complaint.status === 'resolved' ? 'text-green-600' :
                    complaint.status === 'in-progress' ? 'text-blue-600' :
                    'text-yellow-600'
                  }`}>
                    {complaint.status === 'resolved' ? 'Risolto' :
                     complaint.status === 'in-progress' ? 'In Gestione' :
                     'In Attesa'}
                  </span>
                </div>
                <p className="text-sm text-gray-600 line-clamp-1">
                  {complaint.description}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {formatDate(complaint.createdAt)}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}