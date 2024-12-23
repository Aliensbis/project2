import { PAYPAL_CONFIG } from '../config/paypal';

let paypalScriptPromise: Promise<void> | null = null;

export const loadPayPalScript = (): Promise<void> => {
  if (paypalScriptPromise) {
    return paypalScriptPromise;
  }

  paypalScriptPromise = new Promise((resolve, reject) => {
    // Remove any existing PayPal scripts
    const existingScript = document.querySelector('script[src*="paypal.com/sdk/js"]');
    if (existingScript) {
      document.body.removeChild(existingScript);
    }

    const script = document.createElement('script');
    script.src = `https://www.paypal.com/sdk/js?client-id=${PAYPAL_CONFIG.CLIENT_ID}&vault=true&intent=subscription&currency=${PAYPAL_CONFIG.CURRENCY}&locale=${PAYPAL_CONFIG.LOCALE}`;
    script.async = true;

    script.onload = () => resolve();
    script.onerror = () => {
      paypalScriptPromise = null;
      reject(new Error('Failed to load PayPal SDK'));
    };

    document.body.appendChild(script);
  });

  return paypalScriptPromise;
};

export const cleanupPayPalScript = () => {
  const script = document.querySelector('script[src*="paypal.com/sdk/js"]');
  if (script) {
    document.body.removeChild(script);
  }
  paypalScriptPromise = null;
};