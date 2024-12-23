export type SubscriptionStatus = 'trial' | 'active' | 'expired' | 'cancelled';
export type PaymentMethod = 'manual' | 'stripe' | 'paypal';

export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  currency: string;
  interval: 'month' | 'year';
  trialDays: number;
}

export interface Subscription {
  id: string;
  userId: string;
  status: SubscriptionStatus;
  plan: SubscriptionPlan;
  startDate: string;
  trialEndDate: string | null;
  currentPeriodEnd: string;
  cancelAtPeriodEnd: boolean;
  paymentMethod?: PaymentMethod;
  lastPaymentDate?: string;
}

export interface SubscriptionStore {
  subscription: Subscription | null;
  isLoading: boolean;
  startTrial: () => Promise<void>;
  activateSubscription: (paymentMethod: PaymentMethod) => Promise<void>;
  cancelSubscription: () => Promise<void>;
  getRemainingTrialDays: () => number | null;
}