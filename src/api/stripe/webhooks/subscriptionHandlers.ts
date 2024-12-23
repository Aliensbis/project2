import { Stripe } from 'stripe';
import { updateSubscriptionStatus } from '../../../services/subscriptionService';

export async function handleSubscriptionCreated(subscription: Stripe.Subscription) {
  try {
    await updateSubscriptionStatus({
      customerId: subscription.customer as string,
      status: subscription.status,
      currentPeriodEnd: new Date(subscription.current_period_end * 1000).toISOString(),
      subscriptionId: subscription.id,
    });
  } catch (error) {
    console.error('Error handling subscription created:', error);
    throw error;
  }
}