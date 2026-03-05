import {
  useSubscribeAndroid,
  UseSubscribeAndroidPayload,
  UseSubscribeAndroidResponse,
} from '@/src/features/subscription/hooks/use-subscribe-android';
import {
  useSubscribeApple,
  UseSubscribeApplePayload,
  UseSubscribeAppleResponse,
} from '@/src/features/subscription/hooks/use-subscribe-apple';

type UseSubscribeApiResponse = {
  subscribeApple: (
    payload: UseSubscribeApplePayload,
  ) => Promise<UseSubscribeAppleResponse>;
  subscribeAndroid: (
    payload: UseSubscribeAndroidPayload,
  ) => Promise<UseSubscribeAndroidResponse>;
  isLoadingSubscribeApple: boolean;
  isLoadingSubscribeAndroid: boolean;
};

export const useSubscribeApi = (): UseSubscribeApiResponse => {
  const { mutateAsync: subscribeApple, isPending: isLoadingSubscribeApple } =
    useSubscribeApple();
  const {
    mutateAsync: subscribeAndroid,
    isPending: isLoadingSubscribeAndroid,
  } = useSubscribeAndroid();

  return {
    subscribeApple,
    subscribeAndroid,
    isLoadingSubscribeApple,
    isLoadingSubscribeAndroid,
  };
};
