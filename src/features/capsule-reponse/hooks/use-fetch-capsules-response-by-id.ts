import { useAxios } from '@/src/api/use-axios';
import { CapsuleResponse } from '@/src/features/capsule-reponse/types/capsule-response.types';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';
import Toast from 'react-native-toast-message';

type FetchCapsulesResponse = {
  item: CapsuleResponse | null;
};

export const useFetchCapsulesResponseById = (id: number) => {
  const toastShownRef = useRef(false);
  const axios = useAxios();
  const queryClient = useQueryClient();
  const key = ['capsules-responses', id];
  const query = useQuery<CapsuleResponse | null, Error>({
    queryKey: key,
    queryFn: async () => {
      const { data } = await axios.get<FetchCapsulesResponse>(
        `/capsules-response/${id}`,
      );
      return data.item || null;
    },
    enabled: !!id,
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
      queryKey: key,
    });

  return { ...query, invalidate };
};
