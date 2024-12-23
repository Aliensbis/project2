import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { useSubscription } from '../../hooks/useSubscription';

export default function PaymentSuccess() {
  const navigate = useNavigate();
  const { activateSubscription } = useSubscription();

  useEffect(() => {
    const handleSuccess = async () => {
      try {
        await activateSubscription('stripe');
        setTimeout(() => navigate('/'), 3000);
      } catch (error) {
        console.error('Error activating subscription:', error);
      }
    };

    handleSuccess();
  }, [activateSubscription, navigate]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md text-center">
        <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Pagamento Completato
        </h2>
        <p className="text-gray-600 mb-4">
          Grazie per l'abbonamento! Verrai reindirizzato automaticamente...
        </p>
      </div>
    </div>
  );
}