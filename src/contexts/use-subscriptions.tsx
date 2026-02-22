import {
  Subscription,
  SubscriptionStatusEnum,
} from '@/src/features/subscription/types/subscription.types';
import dayjs from 'dayjs';
import { createContext, ReactNode, useContext, useState } from 'react';

export type SubscriptionContextReturn = {
  subscriptions: Subscription[];
  setSubscriptions: (subscriptions: Subscription[]) => void;
  hasActiveSubscription: boolean;
};

const SubscriptionContext = createContext<
  SubscriptionContextReturn | undefined
>(undefined);

export function SubscriptionsProvider({ children }: { children: ReactNode }) {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const now = dayjs();

  const hasActiveSubscription = subscriptions.some((subscription) => {
    const isValidStatus = [
      SubscriptionStatusEnum.SUBSCRIPTION_STATE_ACTIVE,
      SubscriptionStatusEnum.SUBSCRIPTION_STATE_IN_GRACE_PERIOD,
    ].includes(subscription.status);

    const isNotExpired = dayjs(subscription.expiresAt).isAfter(now);

    return isValidStatus && isNotExpired;
  });
  return (
    <SubscriptionContext.Provider
      value={{
        hasActiveSubscription,
        subscriptions,
        setSubscriptions,
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
}

export function useSubscriptions() {
  const ctx = useContext(SubscriptionContext);
  if (!ctx) {
    throw new Error(
      'useSubscriptions must be used inside <SubscriptionsProvider>',
    );
  }
  return ctx;
}
