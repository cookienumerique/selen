import { useAxios } from '@/src/api/use-axios';
import { useUser } from '@/src/contexts/use-user';
import { QueryOptions, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';
import Toast from 'react-native-toast-message';
import { SubThemeCapsule } from '../types/sub-theme-capsule.types';

type UseFetchSubThemeCapsulesResponse = {
  items: SubThemeCapsule[];
};

type FetchInnerWeathersResponsesConfig = {
  params: {
    code?: string;
  };
};

export const useFetchSubThemeCapsules = (
  { params }: FetchInnerWeathersResponsesConfig = { params: {} },
  props?: QueryOptions<SubThemeCapsule[], Error>,
) => {
  const toastShownRef = useRef(false);
  const queryClient = useQueryClient();
  const axios = useAxios();
  const { bearerTokenSelen } = useUser();
  const key = ['sub-theme-capsules', params];
  const query = useQuery<SubThemeCapsule[], Error>({
    queryKey: key,
    queryFn: async () => {
      const { data } = await axios.get<UseFetchSubThemeCapsulesResponse>(
        '/sub-theme-capsules',
        { params },
      );
      return data.items || [];
    },
    enabled: !!bearerTokenSelen,
    ...props,
  });

  useEffect(() => {
    if (!query.error) return;
    if (toastShownRef.current) return;
    toastShownRef.current = true;
    Toast.show({
      type: 'error',
      text1: 'Erreur lors du chargement des sous-thèmes capsules',
      position: 'bottom',
      autoHide: false,
    });
  }, [query.error]);

  const invalidate = () =>
    queryClient.invalidateQueries({
      queryKey: key,
    });

  return {
    ...query,
    invalidate,
  };
};
