import React, { useEffect, useRef, useState } from 'react';
import { useSubscription } from '../../hooks/useSubscription';
import { LoadingSpinner } from '../common/LoadingSpinner';
import { PAYPAL_CONFIG } from '../../config/paypal';

interface PayPalSubscriptionButtonProps {
  onSuccess?: () => void;
  onError?: (error: any) => void;
}

export default function PayPalSubscriptionButton({ 
  onSuccess, 
  onError 
}: PayPalSubscriptionButtonProps) {
  const { activateSubscription } = useSubscription();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const buttonContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let scriptElement: HTMLScriptElement | null = null;

    const loadPayPalScript = async () => {
      try {
        // Remove any existing PayPal scripts
        const existingScript = document.querySelector('script[src*="paypal.com/sdk/js"]');
        if (existingScript) {
          document.body.removeChild(existingScript);
        }

        // Create new script element
        scriptElement = document.createElement('script');
        scriptElement.src = `https://www.paypal.com/sdk/js?client-id=${PAYPAL_CONFIG.CLIENT_ID}&vault=true&intent=subscription&currency=${PAYPAL_CONFIG.CURRENCY}&locale=${PAYPAL_CONFIG.LOCALE}&merchant-id=${PAYPAL_CONFIG.MERCHANT_ID}`;
        scriptElement.async = true;

        // Wait for script to load
        await new Promise<void>((resolve, reject) => {
          if (!scriptElement) return reject();
          scriptElement.onload = () => resolve();
          scriptElement.onerror = () => reject();
          document.body.appendChild(scriptElement);
        });

        // Initialize PayPal buttons
        if (!window.paypal || !buttonContainerRef.current) {
          throw new Error('PayPal initialization failed');
        }

        await window.paypal.Buttons({
          style: {
            layout: 'vertical',
            color: 'blue',
            shape: 'rect',
            label: 'subscribe'
          },
          createSubscription: async (_data: any, actions: any) => {
            return actions.subscription.create({
              plan_id: PAYPAL_CONFIG.PLAN_ID,
              application_context: {
                shipping_preference: 'NO_SHIPPING',
                user_action: 'SUBSCRIBE_NOW',
                brand_name: 'Bibal Foods',
                locale: PAYPAL_CONFIG.LOCALE
              }
            });
          },
          onApprove: async (data: any) => {
            try {
              await activateSubscription('paypal');
              onSuccess?.();
            } catch (err) {
              console.error('Subscription activation error:', err);
              onError?.(err);
            }
          },
          onError: (err: any) => {
            console.error('PayPal Error:', err);
            setError('Si è verificato un errore. Riprova più tardi.');
            onError?.(err);
          }
        }).render(buttonContainerRef.current);

        setIsLoading(false);
      } catch (err) {
        console.error('PayPal initialization error:', err);
        setError('Impossibile inizializzare PayPal. Riprova più tardi.');
        setIsLoading(false);
        onError?.(err);
      }
    };

    loadPayPalScript();

    // Cleanup
    return () => {
      if (scriptElement && document.body.contains(scriptElement)) {
        document.body.removeChild(scriptElement);
      }
    };
  }, [activateSubscription, onSuccess, onError]);

  return (
    <div className="space-y-4">
      <div 
        ref={buttonContainerRef}
        className="min-h-[150px] flex items-center justify-center"
      >
        {isLoading && (
          <div className="flex flex-col items-center space-y-2">
            <LoadingSpinner />
            <span className="text-sm text-gray-500">Caricamento PayPal...</span>
          </div>
        )}
      </div>

      {error && (
        <div className="text-center text-red-600 text-sm p-4 bg-red-50 rounded-md">
          {error}
        </div>
      )}

      <div className="text-center space-y-2">
        <p className="text-sm text-gray-500">
          Pagamento sicuro tramite PayPal
        </p>
        <p className="text-xs text-gray-400">
          Sottoscrivendo accetti di attivare un abbonamento ricorrente di €{PAYPAL_CONFIG.SUBSCRIPTION_PRICE}/mese
        </p>
      </div>
    </div>
  );
}