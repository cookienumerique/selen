import { User } from "@/src/features/user/types/user.types";

export enum SubscriptionStatusEnum {
  SUBSCRIPTION_STATE_UNSPECIFIED = 'SUBSCRIPTION_STATE_UNSPECIFIED',
  SUBSCRIPTION_STATE_PENDING = 'SUBSCRIPTION_STATE_PENDING',
  SUBSCRIPTION_STATE_ACTIVE = 'SUBSCRIPTION_STATE_ACTIVE',
  SUBSCRIPTION_STATE_PAUSED = 'SUBSCRIPTION_STATE_PAUSED',
  SUBSCRIPTION_STATE_IN_GRACE_PERIOD = 'SUBSCRIPTION_STATE_IN_GRACE_PERIOD',
  SUBSCRIPTION_STATE_ON_HOLD = 'SUBSCRIPTION_STATE_ON_HOLD',
  SUBSCRIPTION_STATE_CANCELED = 'SUBSCRIPTION_STATE_CANCELED',
  SUBSCRIPTION_STATE_EXPIRED = 'SUBSCRIPTION_STATE_EXPIRED',
  SUBSCRIPTION_STATE_PENDING_PURCHASE_CANCELED = 'SUBSCRIPTION_STATE_PENDING_PURCHASE_CANCELED',
}

export enum SubscriptionProviderEnum {
  GOOGLE = 'google',
  APPLE = 'apple',
}

export enum SubscriptionBasePlanIdEnum {
  SELEN_PREMIUM_MONTHLY = 'selen-premium-monthly',
  SELEN_PREMIUM_YEARLY = 'selen-premium-yearly',
}

export enum SubscriptionProductIdEnum {
  SELEN_PREMIUM = 'selen_premium',
}
export type SubscriptionStatus = typeof SubscriptionStatusEnum[keyof typeof SubscriptionStatusEnum];

export type Subscription = {
  id: number;
  user: User
  provider: SubscriptionProviderEnum;
  basePlanId: SubscriptionBasePlanIdEnum;
  productId: SubscriptionProductIdEnum;
  purchaseToken: string;
  status: SubscriptionStatusEnum;
  expiresAt: string;
  originalTransactionId: string;
  createdAt: string;
  updatedAt: string;
};
