import { useState, useCallback } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { STRIPE_CONFIG } from '../../config/stripe/constants';
import { createSubscriptionSession } from '../../services/stripe/api';
import { getStripeErrorMessage } from '../../services/stripe/errors';

let stripePromise: ReturnType<typeof loadStripe> | null = null;

export function useStripeSession() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getStripe = useCallback(async () => {
    if (!stripePromise) {
      stripePromise = loadStripe(STRIPE_CONFIG.PUBLISHABLE_KEY);
    }
    return stripePromise;
  }, []);

  const startSubscription = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const stripe = await getStripe();
      if (!stripe) throw new Error('Failed to initialize Stripe');

      const session = await createSubscriptionSession();
      const { error } = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (error) throw error;
    } catch (err) {
      const errorMessage = getStripeErrorMessage(err);
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [getStripe]);

  return {
    startSubscription,
    isLoading,
    error,
  };
}