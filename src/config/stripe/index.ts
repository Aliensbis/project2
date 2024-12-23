import { loadStripe } from '@stripe/stripe-js';

export const STRIPE_CONFIG = {
  PUBLISHABLE_KEY: 'pk_live_lxrTsipZi8JXOxwoeAEPSrmE007vQIwDzU',
  MONTHLY_PRICE: 150,
  CURRENCY: 'EUR',
  SUCCESS_URL: `${window.location.origin}/subscription/success`,
  CANCEL_URL: `${window.location.origin}/subscription/cancel`,
};

let stripePromise: Promise<any> | null = null;

export const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(STRIPE_CONFIG.PUBLISHABLE_KEY);
  }
  return stripePromise;
};