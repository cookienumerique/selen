import { useUser } from '@/src/contexts/use-user';
import { useFetchInnerWeathersResponses } from '@/src/features/inner-weather-response/hooks/use-fetch-inner-weathers-responses';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

type UseInnerWeatherModalReturn = {
  isVisible: boolean;
  setIsVisible: (isVisible: boolean) => void;
};

export const useInnerWeatherModal = (): UseInnerWeatherModalReturn => {
  const [isVisible, setIsVisible] = useState(false);

  const { user, isLoadingUser } = useUser();

  const { data, isPending, isFetched } = useFetchInnerWeathersResponses({
    params: {
      day: dayjs().format('YYYY-MM-DD'),
    },
  });

  const innerWeatherResponseToday = data?.[0];

  const isReady = !!user && !isLoadingUser && isFetched && !isPending;

  useEffect(() => {
    if (!isReady) return;

    if (!innerWeatherResponseToday) {
      setIsVisible(true);
    }
  }, [isReady, innerWeatherResponseToday]);

  return {
    isVisible,
    setIsVisible,
  };
};
