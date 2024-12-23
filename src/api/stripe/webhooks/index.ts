import { Request, Response } from 'express';
import stripe from '../client';
import { handleSubscriptionCreated } from './subscriptionHandlers';

export async function handleStripeWebhook(req: Request, res: Response) {
  const sig = req.headers['stripe-signature'];

  try {
    const event = stripe.webhooks.constructEvent(
      req.body,
      sig!,
      process.env.STRIPE_WEBHOOK_SECRET!
    );

    switch (event.type) {
      case 'customer.subscription.created':
        await handleSubscriptionCreated(event.data.object);
        break;
      // Add other webhook handlers as needed
    }

    res.json({ received: true });
  } catch (err) {
    console.error('Webhook Error:', err);
    res.status(400).send(`Webhook Error: ${err.message}`);
  }
}