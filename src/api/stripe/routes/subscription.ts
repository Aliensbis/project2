import { Request, Response } from 'express';
import stripe from '../client';
import { STRIPE_CONFIG } from '../../../config/stripe';

export async function createSubscriptionSession(req: Request, res: Response) {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription',
      line_items: [{
        price: STRIPE_CONFIG.MONTHLY_PRICE_ID,
        quantity: 1,
      }],
      success_url: STRIPE_CONFIG.SUCCESS_URL,
      cancel_url: STRIPE_CONFIG.CANCEL_URL,
      customer_email: req.body.email,
    });

    res.json({ sessionId: session.id });
  } catch (error) {
    console.error('Stripe session creation error:', error);
    res.status(500).json({ error: 'Failed to create subscription session' });
  }
}