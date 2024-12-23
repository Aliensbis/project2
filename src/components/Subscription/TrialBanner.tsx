import React from 'react';
import { Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSubscription } from '../../hooks/useSubscription';
import { useAuth } from '../../hooks/useAuth';

export default function TrialBanner() {
  const { getRemainingTrialDays } = useSubscription();
  const { user } = useAuth();
  const remainingDays = getRemainingTrialDays();
  const isAdmin = user?.role === 'admin';

  if (!remainingDays) return null;

  return (
    <div className="bg-blue-600 text-white px-4 py-2">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <Clock className="h-5 w-5 mr-2" />
          <span>
            Periodo di prova: {remainingDays} {remainingDays === 1 ? 'giorno' : 'giorni'} rimanenti
          </span>
        </div>
        {isAdmin && (
          <Link 
            to="/subscription"
            className="px-4 py-1 bg-white text-blue-600 rounded-md hover:bg-blue-50"
          >
            Gestisci Abbonamento
          </Link>
        )}
      </div>
    </div>
  );
}