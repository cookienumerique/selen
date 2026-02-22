import { useAxios } from '@/src/api/use-axios';
import { Subscription } from '@/src/features/subscription/types/subscription.types';
import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { Purchase } from 'react-native-iap';

type UseSubscribeApiPayload = {
  purchaseToken: Purchase['purchaseToken'];
  productId: Purchase['productId'];
};

type SubscribeApiResponse = {
  item: Subscription;
};

export const useSubscribeApi = (): UseMutationResult<
  SubscribeApiResponse,
  Error,
  UseSubscribeApiPayload
> => {
  const axios = useAxios();

  return useMutation({
    mutationFn: async ({ purchaseToken, productId }) => {
      const { data } = await axios.post<SubscribeApiResponse>(
        '/subscriptions/android',
        { purchaseToken, productId },
      );

      return data;
    },
  });
};
