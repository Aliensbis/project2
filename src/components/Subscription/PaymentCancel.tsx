import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { XCircle } from 'lucide-react';

export default function PaymentCancel() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => navigate('/'), 3000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md text-center">
        <XCircle className="mx-auto h-16 w-16 text-red-500 mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Pagamento Annullato
        </h2>
        <p className="text-gray-600 mb-4">
          Il pagamento è stato annullato. Verrai reindirizzato automaticamente...
        </p>
      </div>
    </div>
  );
}