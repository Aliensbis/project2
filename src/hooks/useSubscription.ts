import { useState, useCallback } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { STRIPE_CONFIG } from '../config/stripe';

let stripePromise: Promise<any> | null = null;

const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(STRIPE_CONFIG.PUBLISHABLE_KEY);
  }
  return stripePromise;
};

export function useSubscription() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const startSubscription = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const stripe = await getStripe();
      if (!stripe) throw new Error('Failed to load Stripe');

      // Create a checkout session
      const response = await fetch('/api/stripe/create-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId: STRIPE_CONFIG.PRODUCT_ID,
          successUrl: STRIPE_CONFIG.SUCCESS_URL,
          cancelUrl: STRIPE_CONFIG.CANCEL_URL,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create checkout session');
      }

      const { sessionId } = await response.json();
      
      // Redirect to Stripe checkout
      const { error: redirectError } = await stripe.redirectToCheckout({
        sessionId,
      });

      if (redirectError) throw redirectError;

    } catch (err) {
      console.error('Subscription error:', err);
      setError('Si è verificato un errore. Riprova più tardi.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    startSubscription,
    isLoading,
    error,
  };
}