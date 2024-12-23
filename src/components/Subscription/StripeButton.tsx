import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard } from 'lucide-react';

export default function StripeButton() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate('/subscription')}
      className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white 
                 rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
    >
      <CreditCard className="w-5 h-5 mr-2" />
      Gestisci Abbonamento
    </button>
  );
}