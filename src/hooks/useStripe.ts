import { useState, useCallback } from 'react';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { STRIPE_CONFIG } from '../config/stripe';

let stripePromise: Promise<Stripe | null>;

export function useStripe() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getStripe = useCallback(() => {
    if (!stripePromise) {
      stripePromise = loadStripe(STRIPE_CONFIG.PUBLISHABLE_KEY);
    }
    return stripePromise;
  }, []);

  const redirectToCheckout = useCallback(async (sessionId: string) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const stripe = await getStripe();
      if (!stripe) throw new Error('Failed to load Stripe');

      const { error } = await stripe.redirectToCheckout({ sessionId });
      if (error) throw error;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [getStripe]);

  return {
    redirectToCheckout,
    isLoading,
    error,
  };
}