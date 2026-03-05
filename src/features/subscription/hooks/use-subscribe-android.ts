import { useAxios } from '@/src/api/use-axios';
import { Subscription } from '@/src/features/subscription/types/subscription.types';
import { useMutation } from '@tanstack/react-query';

export type UseSubscribeAndroidPayload = {
  purchaseToken: string;
  productId: string;
};

export type UseSubscribeAndroidResponse = {
  item: Subscription;
};

export const useSubscribeAndroid = () => {
  const axios = useAxios();

  return useMutation({
    mutationFn: async ({
      purchaseToken,
      productId,
    }: UseSubscribeAndroidPayload) => {
      const { data } = await axios.post<UseSubscribeAndroidResponse>(
        '/subscriptions/android',
        { purchaseToken, productId },
      );
      return data;
    },
  });
};
