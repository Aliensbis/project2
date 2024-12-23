import React from 'react';
import { useSubscription } from '../../hooks/useSubscription';
import TrialBanner from './TrialBanner';
import SubscriptionForm from './SubscriptionForm';

interface SubscriptionGateProps {
  children: React.ReactNode;
}

export default function SubscriptionGate({ children }: SubscriptionGateProps) {
  const { subscription, isLoading } = useSubscription();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
      </div>
    );
  }

  // No subscription - show subscription form with trial option
  if (!subscription) {
    return <SubscriptionForm showTrial={true} />;
  }

  // Trial period
  if (subscription.status === 'trial') {
    return (
      <>
        <TrialBanner />
        {children}
      </>
    );
  }

  // Expired or cancelled subscription
  if (subscription.status === 'expired' || subscription.status === 'cancelled') {
    return <SubscriptionForm showTrial={false} />;
  }

  // Active subscription
  return <>{children}</>;
}