import { useAxios } from '@/src/api/axios';
import { useUser } from '@/src/contexts/use-user';
import { QueryOptions, useQuery } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';
import Toast from 'react-native-toast-message';
import { InnerWeatherResponse } from '../types/inner-weather-response.types';

type FetchInnerWeathersResponsesReturn = {
  items: InnerWeatherResponse[];
};

type FetchInnerWeathersResponsesConfig = {
  params: {
    day?: string;
  };
};

export const useFetchInnerWeathersResponses = ({ params }: FetchInnerWeathersResponsesConfig = { params: {} }, props?: QueryOptions<InnerWeatherResponse[], Error>) => {
  const axios = useAxios();
  const toastShownRef = useRef(false);
  const { user } = useUser();

  const query = useQuery<InnerWeatherResponse[], Error>({
    queryKey: ['inner-weathers-responses', params, user?.uid],
    queryFn: async () => {
      const { data } = await axios.get<FetchInnerWeathersResponsesReturn>('/inner-weather-responses', { params });
      return data.items || [];
    },
    enabled: !!user,
    ...props,
  });

  useEffect(() => {
    if (!query.error) return;
    if (toastShownRef.current) return;
    toastShownRef.current = true;
    Toast.show({
      type: 'error',
      text1: 'Erreur lors du chargement des réponses des météos intérieures',
      position: 'bottom',
      autoHide: false,
    });
  }, [query.error]);

  return query;
};
