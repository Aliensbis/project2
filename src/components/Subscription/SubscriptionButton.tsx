import React from 'react';
import { CreditCard } from 'lucide-react';
import { useSubscription } from '../../hooks/useSubscription';
import { LoadingSpinner } from '../common/LoadingSpinner';

export default function SubscriptionButton() {
  const { startSubscription, isLoading, error } = useSubscription();

  return (
    <div className="space-y-2">
      <button
        onClick={() => startSubscription()}
        disabled={isLoading}
        className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md 
                 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <>
            <CreditCard className="h-5 w-5 mr-2" />
            Attiva Abbonamento
          </>
        )}
      </button>
      {error && (
        <p className="text-sm text-red-600 text-center">{error}</p>
      )}
    </div>
  );
}