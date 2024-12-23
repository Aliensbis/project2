import React, { useState } from 'react';
import { AlertCircle, CheckCircle, Clock, Trash2, Image as ImageIcon } from 'lucide-react';
import { Complaint } from '../../types/Complaint';
import { formatDate } from '../../utils/dateUtils';

interface ComplaintCardProps {
  complaint: Complaint;
  isAdmin: boolean;
  onUpdateStatus: (id: string, status: Complaint['status'], resolution?: string) => void;
  onDelete: (id: string) => void;
}

export default function ComplaintCard({
  complaint,
  isAdmin,
  onUpdateStatus,
  onDelete
}: ComplaintCardProps) {
  const [resolution, setResolution] = useState('');
  const [showImages, setShowImages] = useState(false);

  const getSeverityColor = () => {
    switch (complaint.severity) {
      case 'critical': return 'text-red-600 bg-red-50';
      case 'high': return 'text-orange-600 bg-orange-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'low': return 'text-green-600 bg-green-50';
    }
  };

  const getStatusColor = () => {
    switch (complaint.status) {
      case 'pending': return 'text-yellow-600 bg-yellow-50';
      case 'in-progress': return 'text-blue-600 bg-blue-50';
      case 'resolved': return 'text-green-600 bg-green-50';
    }
  };

  const getStatusIcon = () => {
    switch (complaint.status) {
      case 'pending': return AlertCircle;
      case 'in-progress': return Clock;
      case 'resolved': return CheckCircle;
    }
  };

  const StatusIcon = getStatusIcon();

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Reclamo #{complaint.id.slice(-4)}
          </h3>
          <p className="text-sm text-gray-500">{formatDate(complaint.createdAt)}</p>
        </div>
        {isAdmin && (
          <button
            onClick={() => onDelete(complaint.id)}
            className="p-1 text-red-600 hover:bg-red-50 rounded"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        )}
      </div>

      <div className="space-y-4">
        <div className={`inline-flex items-center px-3 py-1 rounded-full ${getSeverityColor()}`}>
          <AlertCircle className="h-4 w-4 mr-2" />
          <span className="text-sm font-medium capitalize">{complaint.severity}</span>
        </div>

        <div>
          <p className="text-sm font-medium text-gray-700">Cliente</p>
          <p className="text-gray-900">#{complaint.customerId}</p>
        </div>

        <div>
          <p className="text-sm font-medium text-gray-700">Descrizione</p>
          <p className="text-gray-900">{complaint.description}</p>
        </div>

        {complaint.images.length > 0 && (
          <div>
            <button
              onClick={() => setShowImages(!showImages)}
              className="flex items-center text-gray-600 hover:text-gray-900"
            >
              <ImageIcon className="h-5 w-5 mr-2" />
              <span className="text-sm">
                {complaint.images.length} immagini allegate
              </span>
            </button>
            {showImages && (
              <div className="grid grid-cols-2 gap-4 mt-4">
                {complaint.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Immagine ${index + 1}`}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                ))}
              </div>
            )}
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className={`flex items-center px-3 py-1 rounded-full ${getStatusColor()}`}>
            <StatusIcon className="h-4 w-4 mr-2" />
            <span className="text-sm font-medium">
              {complaint.status === 'pending' ? 'In attesa' :
               complaint.status === 'in-progress' ? 'In gestione' : 'Risolto'}
            </span>
          </div>

          {!isAdmin && complaint.status !== 'resolved' && (
            <div className="flex items-center space-x-2">
              {complaint.status === 'pending' && (
                <button
                  onClick={() => onUpdateStatus(complaint.id, 'in-progress')}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  Prendi in carico
                </button>
              )}
              {complaint.status === 'in-progress' && (
                <>
                  <input
                    type="text"
                    value={resolution}
                    onChange={(e) => setResolution(e.target.value)}
                    placeholder="Risoluzione..."
                    className="text-sm border rounded px-2 py-1"
                  />
                  <button
                    onClick={() => {
                      if (resolution.trim()) {
                        onUpdateStatus(complaint.id, 'resolved', resolution);
                      }
                    }}
                    className="text-sm text-green-600 hover:text-green-800"
                  >
                    Risolvi
                  </button>
                </>
              )}
            </div>
          )}
        </div>

        {complaint.resolution && (
          <div className="mt-4 p-3 bg-gray-50 rounded-md">
            <p className="text-sm font-medium text-gray-700">Risoluzione</p>
            <p className="text-sm text-gray-600">{complaint.resolution}</p>
          </div>
        )}
      </div>
    </div>
  );
}