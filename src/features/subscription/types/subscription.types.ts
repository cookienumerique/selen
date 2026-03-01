import { User } from '@/src/features/user/types/user.types';

// Android
export enum SubscriptionAndroidProductIdEnum {
  SELEN_PREMIUM = 'selen_premium',
}

export enum SubscriptionAndroidBasePlanIdEnum {
  SELEN_PREMIUM_MONTHLY = 'selen-premium-monthly',
  SELEN_PREMIUM_YEARLY = 'selen-premium-yearly',
  SELEN_PREMIUM_MONTHLY_FOUNDER = 'selen-premium-monthly-founder',
  SELEN_PREMIUM_YEARLY_FOUNDER = 'selen-premium-yearly-founder',
}

// iOS
export enum SubscriptionIosProductIdEnum {
  SELEN_PREMIUM = 'selen_premium',
}
export enum SubscriptionIosBasePlanIdEnum {
  SELEN_PREMIUM_MONTHLY = 'selen_premium_monthly',
  SELEN_PREMIUM_YEARLY = 'selen_premium_yearly',
  SELEN_PREMIUM_MONTHLY_FOUNDER = 'selen_premium_monthly_founder',
  SELEN_PREMIUM_YEARLY_FOUNDER = 'selen_premium_yearly_founder',
}

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
  MANUAL = 'manual',
  GOOGLE = 'google',
  APPLE = 'apple',
}

export enum SubscriptionProductIdEnum {
  SELEN_PREMIUM = 'selen_premium',
}
export type SubscriptionStatus =
  (typeof SubscriptionStatusEnum)[keyof typeof SubscriptionStatusEnum];

export type Subscription = {
  id: number;
  user: User;
  provider: SubscriptionProviderEnum;
  basePlanId?: SubscriptionAndroidBasePlanIdEnum | SubscriptionIosBasePlanIdEnum;
  productId?: SubscriptionProductIdEnum;
  purchaseToken: string;
  status: SubscriptionStatusEnum;
  expiresAt: string;
  originalTransactionId: string;
  createdAt: string;
  updatedAt: string;
};

