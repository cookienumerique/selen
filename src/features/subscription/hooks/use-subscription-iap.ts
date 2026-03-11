import { useSubscriptions } from '@/src/contexts/use-subscriptions';
import { useUser } from '@/src/contexts/use-user';
import {
  SubscriptionAndroidBasePlanIdEnum,
  SubscriptionAndroidProductIdEnum,
  SubscriptionIosBasePlanIdEnum,
} from '@/src/features/subscription/types/subscription.types';
import { router } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Platform } from 'react-native';
import {
  fetchProducts,
  finishTransaction,
  getTransactionJwsIOS,
  ProductOrSubscription,
  purchaseErrorListener,
  purchaseUpdatedListener,
  requestPurchase,
  type Purchase,
} from 'react-native-iap';
import { useSubscribeApi } from './use-subscribe-api';
export const useSubscriptionIap = () => {
  const listenersInitialized = useRef<boolean>(false);
  const [subscriptionsIap, setSubscriptionsIap] = useState<
    ProductOrSubscription[]
  >([]);
  const {
    subscribeAndroid,
    subscribeApple,
    isLoadingSubscribeApple,
    isLoadingSubscribeAndroid,
  } = useSubscribeApi();
  const { setUser } = useUser();
  const { setSubscriptions } = useSubscriptions();

  useEffect(() => {
    let updateListener: any;
    let errorListener: any;

    if (listenersInitialized.current) return;
    listenersInitialized.current = true;

    const fetchSubs = async () => {
      try {
        const skus =
          Platform.OS === 'ios'
            ? [
              SubscriptionIosBasePlanIdEnum.SELEN_INFINI_MONTHLY_FOUNDER,
              SubscriptionIosBasePlanIdEnum.SELEN_INFINI_YEARLY_FOUNDER,
            ]
            : [SubscriptionAndroidProductIdEnum.SELEN_PREMIUM];

        const subs = await fetchProducts({
          skus,
          type: 'subs',
        });

        setSubscriptionsIap(subs ?? []);
      } catch (error) {
        console.warn('Fetch products error:', error);
      }
    };

    fetchSubs();

    updateListener = purchaseUpdatedListener(async (purchaseData: Purchase) => {
      try {
        if (Platform.OS === 'ios') {
          const { transactionId, productId } = purchaseData;

          if (!transactionId) return;

          const receipt = await getTransactionJwsIOS(productId);

          if (!receipt) return;
          const { item: subscriptionCreated } = await subscribeApple({
            receipt,
          });

          await finishTransaction({
            purchase: purchaseData,
          });

          setSubscriptions(prev => [...(prev ?? []), subscriptionCreated]);

          setUser(subscriptionCreated.user);
          router.replace('/(tabs)/home');
          return;
        }

        const { purchaseToken, productId } = purchaseData;
        if (!purchaseToken) return;
        const { item: subscriptionCreated } = await subscribeAndroid({
          purchaseToken,
          productId,
        });

        await finishTransaction({
          purchase: purchaseData,
          isConsumable: false,
        });
        setSubscriptions(prev => [...(prev ?? []), subscriptionCreated]);
        setUser(subscriptionCreated?.user);

        if (!subscriptionCreated) return;
        router.replace('/(tabs)/home');
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
  }, [
    subscribeApple,
    setSubscriptions,
    setUser,
    subscribeAndroid,
  ]);

  const buy = async (
    basePlanId:
      | SubscriptionAndroidBasePlanIdEnum
      | SubscriptionIosBasePlanIdEnum,
  ) => {
    try {
      if (!subscriptionsIap.length) return;

      // ===== IOS =====
      if (Platform.OS === 'ios') {
        await requestPurchase({
          type: 'subs',
          request: {
            ios: {
              sku: basePlanId,
            },
          },
        });
        return;
      }

      const product = subscriptionsIap.find(
        (s) => s.id === SubscriptionAndroidProductIdEnum.SELEN_PREMIUM,
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
            skus: [SubscriptionAndroidProductIdEnum.SELEN_PREMIUM],
            subscriptionOffers: [
              {
                sku: SubscriptionAndroidProductIdEnum.SELEN_PREMIUM,
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

  return {
    subscriptionsIap,
    buy,
    isLoading: isLoadingSubscribeApple || isLoadingSubscribeAndroid,
  };
};
