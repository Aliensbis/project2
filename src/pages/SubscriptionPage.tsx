import React from 'react';
import { CreditCard, Shield, Clock, CheckCircle } from 'lucide-react';
import { useSubscription } from '../hooks/useSubscription';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { STRIPE_CONFIG } from '../config/stripe';

export default function SubscriptionPage() {
  const { startSubscription, isLoading, error } = useSubscription();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Gestione Abbonamento
          </h1>
          <p className="text-xl text-gray-600">
            Accedi a tutte le funzionalità con il nostro piano business
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <Shield className="h-12 w-12 text-blue-600 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Pagamenti Sicuri</h3>
            <p className="text-gray-600">
              Gestiti da Stripe con massima sicurezza e protezione dei dati
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <Clock className="h-12 w-12 text-green-600 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Abbonamento Flessibile</h3>
            <p className="text-gray-600">
              Rinnovo mensile automatico, disdici quando vuoi
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <CheckCircle className="h-12 w-12 text-purple-600 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Funzionalità Complete</h3>
            <p className="text-gray-600">
              Accesso illimitato a tutte le funzionalità del sistema
            </p>
          </div>
        </div>

        <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="px-8 pt-8">
            <div className="text-center">
              <CreditCard className="mx-auto h-12 w-12 text-blue-600" />
              <h2 className="mt-4 text-3xl font-bold text-gray-900">Piano Business</h2>
              <p className="mt-2 text-gray-600">Gestione completa della tua attività</p>
            </div>

            <div className="mt-6 text-center">
              <p className="text-5xl font-bold text-gray-900">€{STRIPE_CONFIG.MONTHLY_PRICE}</p>
              <p className="text-gray-600">/mese</p>
            </div>

            <div className="mt-8">
              <ul className="space-y-4">
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span>Gestione ordini e produzione</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span>Statistiche dettagliate</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span>Gestione magazzino</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span>Chat interna</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span>Gestione reclami</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="px-8 py-6 mt-6 bg-gray-50">
            <button
              onClick={() => startSubscription()}
              disabled={isLoading}
              className="w-full flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-md 
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
              <p className="mt-2 text-sm text-red-600 text-center">{error}</p>
            )}
            <p className="mt-4 text-sm text-center text-gray-500">
              Pagamento sicuro con Stripe
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}