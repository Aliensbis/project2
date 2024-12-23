import { STRIPE_CONFIG } from '../../config/stripe/constants';
import type { StripeSession } from '../../config/stripe/types';

export async function createSubscriptionSession(): Promise<StripeSession> {
  const response = await fetch('/api/stripe/create-session', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      price: STRIPE_CONFIG.MONTHLY_PRICE,
      currency: STRIPE_CONFIG.CURRENCY,
      successUrl: STRIPE_CONFIG.SUCCESS_URL,
      cancelUrl: STRIPE_CONFIG.CANCEL_URL,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to create subscription session');
  }

  return response.json();
}