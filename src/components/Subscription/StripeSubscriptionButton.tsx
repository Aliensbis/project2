import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { STRIPE_CONFIG } from '../../config/stripe';

interface StripeSubscriptionButtonProps {
  onError?: (error: any) => void;
}

export default function StripeSubscriptionButton({ onError }: StripeSubscriptionButtonProps) {
  const handleSubscribe = async () => {
    try {
      const stripe = await loadStripe(STRIPE_CONFIG.PUBLISHABLE_KEY);
      if (!stripe) throw new Error('Stripe failed to load');

      const response = await fetch('/api/create-subscription-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId: STRIPE_CONFIG.MONTHLY_PRICE_ID,
          successUrl: STRIPE_CONFIG.SUCCESS_URL,
          cancelUrl: STRIPE_CONFIG.CANCEL_URL,
        }),
      });

      const session = await response.json();
      
      const { error } = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (error) throw error;
    } catch (err) {
      console.error('Subscription error:', err);
      onError?.(err);
    }
  };

  return (
    <button
      onClick={handleSubscribe}
      className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 
                 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
    >
      Attiva Abbonamento
    </button>
  );
}