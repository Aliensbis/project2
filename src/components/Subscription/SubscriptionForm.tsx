import React from 'react';
import { CreditCard } from 'lucide-react';
import { useSubscription } from '../../hooks/useSubscription';
import { STRIPE_CONFIG } from '../../config/stripe/constants';
import StripeButton from './StripeButton';

interface SubscriptionFormProps {
  showTrial?: boolean;
}

export default function SubscriptionForm({ showTrial = false }: SubscriptionFormProps) {
  const { startTrial } = useSubscription();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <CreditCard className="mx-auto h-12 w-12 text-blue-600" />
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            {showTrial ? 'Inizia la Prova Gratuita' : 'Abbonamento Richiesto'}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {showTrial 
              ? 'Prova tutte le funzionalità gratuitamente per 30 giorni'
              : 'Per continuare ad utilizzare l\'applicazione è necessario un abbonamento attivo'}
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="text-center mb-6">
            <h3 className="text-lg font-medium text-gray-900">Piano Mensile</h3>
            <p className="mt-2 text-4xl font-bold text-blue-600">
              €{STRIPE_CONFIG.MONTHLY_PRICE}
            </p>
            <p className="mt-1 text-sm text-gray-500">al mese</p>
          </div>

          {showTrial ? (
            <button
              onClick={() => startTrial()}
              className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 
                       focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Inizia il Periodo di Prova
            </button>
          ) : (
            <StripeButton 
              onError={(err) => console.error('Stripe error:', err)} 
            />
          )}
        </div>
      </div>
    </div>
  );
}