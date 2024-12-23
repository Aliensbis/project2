import { SubscriptionPlan } from '../types/Subscription';

export const SUBSCRIPTION_PLANS: Record<string, SubscriptionPlan> = {
  standard: {
    id: 'standard',
    name: 'Piano Standard',
    price: 150,
    currency: 'EUR',
    interval: 'month',
    trialDays: 30
  }
};

export const TRIAL_DURATION_DAYS = 30;