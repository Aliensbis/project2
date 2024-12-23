import { getStripe, STRIPE_CONFIG } from '../config/stripe';

export async function createCheckoutSession() {
  try {
    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        price: STRIPE_CONFIG.MONTHLY_PRICE,
        successUrl: STRIPE_CONFIG.SUCCESS_URL,
        cancelUrl: STRIPE_CONFIG.CANCEL_URL,
      }),
    });

    const { sessionId } = await response.json();
    return sessionId;
  } catch (error) {
    console.error('Error creating checkout session:', error);
    throw new Error('Failed to create checkout session');
  }
}

export async function redirectToCheckout(sessionId: string) {
  try {
    const stripe = await getStripe();
    if (!stripe) throw new Error('Stripe not initialized');

    const { error } = await stripe.redirectToCheckout({ sessionId });
    if (error) throw error;
  } catch (error) {
    console.error('Error redirecting to checkout:', error);
    throw error;
  }
}