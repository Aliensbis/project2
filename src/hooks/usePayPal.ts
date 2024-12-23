import { useState, useEffect, useCallback } from 'react';
import { loadPayPalScript, cleanupPayPalScript } from '../utils/paypalLoader';
import { PAYPAL_CONFIG } from '../config/paypal';

interface PayPalButtonOptions {
  onApprove: (data: any) => Promise<void>;
  onError?: (error: any) => void;
  onCancel?: () => void;
}

export function usePayPal() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      cleanupPayPalScript();
    };
  }, []);

  const initializeButton = useCallback(async (
    container: HTMLElement,
    options: PayPalButtonOptions
  ) => {
    try {
      setIsLoading(true);
      setError(null);

      await loadPayPalScript();

      if (!window.paypal) {
        throw new Error('PayPal SDK not loaded');
      }

      await window.paypal.Buttons({
        style: {
          layout: 'vertical',
          color: 'blue',
          shape: 'rect',
          label: 'subscribe'
        },
        createSubscription: (_data: any, actions: any) => {
          return actions.subscription.create({
            plan_id: PAYPAL_CONFIG.PLAN_ID,
            application_context: {
              shipping_preference: 'NO_SHIPPING',
              user_action: 'SUBSCRIBE_NOW',
              brand_name: 'Bibal Foods',
              locale: PAYPAL_CONFIG.LOCALE,
            }
          });
        },
        onApprove: async (data: any) => {
          try {
            await options.onApprove(data);
          } catch (err) {
            console.error('Error in onApprove:', err);
            options.onError?.(err);
          }
        },
        onCancel: options.onCancel,
        onError: (err: any) => {
          console.error('PayPal Error:', err);
          setError('Si è verificato un errore. Riprova più tardi.');
          options.onError?.(err);
        }
      }).render(container);

      setIsLoading(false);
    } catch (err) {
      console.error('Error initializing PayPal:', err);
      setError('Impossibile caricare PayPal. Riprova più tardi.');
      setIsLoading(false);
      options.onError?.(err);
    }
  }, []);

  return {
    isLoading,
    error,
    initializeButton
  };
}