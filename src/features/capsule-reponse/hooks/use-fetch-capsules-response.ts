import { useAxios } from '@/src/api/use-axios';
import { useUser } from '@/src/contexts/use-user';
import { CapsuleResponse } from '@/src/features/capsule-reponse/types/capsule-response.types';
import { useQuery, useQueryClient, UseQueryOptions } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';
import Toast from 'react-native-toast-message';
type FetchCapsulesResponse = {
  items: CapsuleResponse[];
};

export const useFetchCapsulesResponse = (
  props?: UseQueryOptions<CapsuleResponse[], Error>,
) => {
  const { bearerTokenSelen } = useUser();
  const queryClient = useQueryClient();
  const toastShownRef = useRef(false);
  const axios = useAxios();
  const query = useQuery<CapsuleResponse[], Error>({
    queryKey: ['capsules-responses'],
    queryFn: async () => {
      const { data } =
        await axios.get<FetchCapsulesResponse>('/capsules-response');
      return data.items ?? [];
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
      text1: 'Erreur lors du chargement des capsules',
      position: 'bottom',
      autoHide: false,
    });
  }, [query.error]);

  const invalidate = () =>
    queryClient.invalidateQueries({
      queryKey: ['capsules-responses'],
    });

  return {
    ...query,
    invalidate,
  };
};
