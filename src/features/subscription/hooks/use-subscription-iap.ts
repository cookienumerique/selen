import { useSubscriptions } from '@/src/contexts/use-subscriptions';
import { useUser } from '@/src/contexts/use-user';
import { SubscriptionBasePlanIdEnum } from '@/src/features/subscription/types/subscription.types';
import { router } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import {
  fetchProducts,
  finishTransaction,
  ProductOrSubscription,
  purchaseErrorListener,
  purchaseUpdatedListener,
  requestPurchase,
  type Purchase,
} from 'react-native-iap';
import { useIapInit } from './use-iap-init';
import { useSubscribeApi } from './use-subscribe-api';
export const subscriptionProductId = 'selen_premium';

export type SubscriptionBasePlanId =
  | SubscriptionBasePlanIdEnum.SELEN_PREMIUM_MONTHLY
  | SubscriptionBasePlanIdEnum.SELEN_PREMIUM_YEARLY
  | SubscriptionBasePlanIdEnum.SELEN_PREMIUM_MONTHLY_FOUNDER
  | SubscriptionBasePlanIdEnum.SELEN_PREMIUM_YEARLY_FOUNDER;

export const useSubscriptionIap = () => {
  const listenersInitialized = useRef<boolean>(false);

  useIapInit();
  const [subscriptionsIap, setSubscriptionsIap] = useState<
    ProductOrSubscription[]
  >([]);
  const { mutateAsync: subscribeApi, isPending: isLoadingSubscribeApi } =
    useSubscribeApi();
  const { setUser } = useUser();
  const { subscriptions, setSubscriptions } = useSubscriptions();

  useEffect(() => {
    let updateListener: any;
    let errorListener: any;

    if (listenersInitialized.current) return;

    listenersInitialized.current = true;

    const fetchSubs = async () => {
      try {
        const subs = await fetchProducts({
          skus: [subscriptionProductId],
          type: 'subs',
        });

        setSubscriptionsIap(subs ?? []);
      } catch (error) {
        console.warn('Fetch products error:', error);
      }
    };

    fetchSubs();

    updateListener = purchaseUpdatedListener(async (purchaseData: Purchase) => {
      const { purchaseToken, productId } = purchaseData;
      try {
        if (!purchaseToken) return;
        const { item: subscriptionCreated } = await subscribeApi({
          purchaseToken,
          productId,
        });
        setSubscriptions([...(subscriptions ?? []), subscriptionCreated]);
        setUser(subscriptionCreated?.user);

        if (!subscriptionCreated) return;
        await finishTransaction({
          purchase: purchaseData,
          isConsumable: false,
        });
        router.push('/(tabs)/home');
      } catch (error) {
        console.error('Backend validation error:', error);
      }
    });

    errorListener = purchaseErrorListener((error) => {
      console.warn('Purchase error:', error);
    });

    return () => {
      updateListener?.remove();
      errorListener?.remove();
    };
  }, [subscribeApi, setSubscriptions, setUser, subscriptions]);

  const buy = async (basePlanId: SubscriptionBasePlanId) => {
    try {
      if (!subscriptionsIap.length) return;
      const product = subscriptionsIap.find(
        (s) => s.id === subscriptionProductId,
      );

      if (!product?.subscriptionOffers) return;

      const offer = product?.subscriptionOffers?.find(
        (offer) => offer.basePlanIdAndroid === basePlanId,
      );

      if (!offer?.offerTokenAndroid) {
        console.warn('Offer token missing');
        return;
      }

      await requestPurchase({
        type: 'subs',
        request: {
          google: {
            skus: [subscriptionProductId],
            subscriptionOffers: [
              {
                sku: subscriptionProductId,
                offerToken: offer.offerTokenAndroid,
              },
            ],
          },
        },
      });
    } catch (error) {
      console.warn('Buy error:', error);
    }
  };

  return { subscriptionsIap, buy, isLoading: isLoadingSubscribeApi };
};
