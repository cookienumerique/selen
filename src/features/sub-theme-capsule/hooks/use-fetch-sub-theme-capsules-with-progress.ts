import { useAxios } from '@/src/api/use-axios';
import { useUser } from '@/src/contexts/use-user';
import { SubThemeCapsuleWithProgress } from '@/src/features/sub-theme-capsule/types/sub-theme-capsule-with-progress.types';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';
import Toast from 'react-native-toast-message';

type UseFetchSubThemeCapsulesWithProgressResponse = {
  items: SubThemeCapsuleWithProgress[];
};

export const useFetchSubThemeCapsulesWithProgress = () => {
  const toastShownRef = useRef(false);
  const queryClient = useQueryClient();
  const axios = useAxios();
  const { bearerTokenSelen } = useUser();
  const key = ['sub-theme-capsules-with-progress'];
  const query = useQuery<SubThemeCapsuleWithProgress[], Error>({
    queryKey: key,
    queryFn: async () => {
      const { data } = await axios.get<UseFetchSubThemeCapsulesWithProgressResponse>(
        '/sub-theme-capsules/with-progress',
      );
      return data.items || [];
    },
    enabled: !!bearerTokenSelen,
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
    invalidate,
    ...query
  }
};
