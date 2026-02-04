import { useAxios } from '@/src/api/axios';
import { InnerWeather } from '@/src/features/inner-weather/types/inner-weather.types';
import { QueryOptions, useQuery } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';
import Toast from 'react-native-toast-message';

type FetchInnerWeathersResponse = {
  items: InnerWeather[];
};

export const useFetchInnerWeathers = (
  props?: QueryOptions<InnerWeather[], Error>,
) => {
  const axios = useAxios();
  const toastShownRef = useRef(false);

  const query = useQuery<InnerWeather[], Error>({
    queryKey: ['inner-weathers'],
    queryFn: async () => {
      const { data } =
        await axios.get<FetchInnerWeathersResponse>('/inner-weathers');
      return data.items || [];
    },
    ...props,
  });

  useEffect(() => {
    if (!query.error) return;
    if (toastShownRef.current) return;
    toastShownRef.current = true;
    Toast.show({
      type: 'error',
      text1: 'Erreur lors du chargement des météos intérieures',
      position: 'bottom',
      autoHide: false,
    });
  }, [query.error]);

  return query;
};
