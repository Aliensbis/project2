import React, { useState } from 'react';
import { CheckCircle, Clock, Truck, Package, User } from 'lucide-react';
import { Order } from '../../types/Order';
import { useAuth } from '../../hooks/useAuth';

interface OrderStatusManagerProps {
  currentStatus: Order['status'];
  isAgentOrder: boolean;
  onStatusChange: (status: Order['status'], pickedUpBy?: string) => void;
}

export default function OrderStatusManager({ 
  currentStatus, 
  isAgentOrder,
  onStatusChange 
}: OrderStatusManagerProps) {
  const { user } = useAuth();
  const [pickedUpBy, setPickedUpBy] = useState('');
  const [showPickupInput, setShowPickupInput] = useState(false);

  const handlePickupConfirm = () => {
    if (pickedUpBy.trim()) {
      onStatusChange('picked-up', pickedUpBy.trim());
      setShowPickupInput(false);
      setPickedUpBy('');
    }
  };

  const isProduction = user?.role === 'production';
  const isAgent = user?.role === 'agent';

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="font-medium text-gray-900 mb-4">Stato Ordine</h3>
      
      <div className="flex space-x-4">
        {currentStatus === 'pending' && isProduction && (
          <button
            onClick={() => onStatusChange('in-progress')}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            <Clock className="h-5 w-5 mr-2" />
            Avvia Lavorazione
          </button>
        )}

        {currentStatus === 'in-progress' && isProduction && (
          <button
            onClick={() => onStatusChange('completed')}
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            <CheckCircle className="h-5 w-5 mr-2" />
            Segna come Completato
          </button>
        )}

        {currentStatus === 'completed' && isProduction && (
          <button
            onClick={() => onStatusChange('ready-for-pickup')}
            className="flex items-center px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700"
          >
            <Package className="h-5 w-5 mr-2" />
            Pronto per il Ritiro
          </button>
        )}

        {currentStatus === 'ready-for-pickup' && isProduction && (
          <div className="flex space-x-2">
            {isAgentOrder ? (
              <>
                {!showPickupInput ? (
                  <button
                    onClick={() => setShowPickupInput(true)}
                    className="flex items-center px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
                  >
                    <User className="h-5 w-5 mr-2" />
                    Registra Ritiro
                  </button>
                ) : (
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={pickedUpBy}
                      onChange={(e) => setPickedUpBy(e.target.value)}
                      placeholder="Nome di chi ritira"
                      className="px-3 py-2 border rounded"
                    />
                    <button
                      onClick={handlePickupConfirm}
                      className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
                    >
                      Conferma
                    </button>
                  </div>
                )}
              </>
            ) : (
              <button
                onClick={() => onStatusChange('shipped')}
                className="flex items-center px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
              >
                <Truck className="h-5 w-5 mr-2" />
                Segna come Spedito
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}