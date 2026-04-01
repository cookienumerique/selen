import { useAxios } from '@/src/api/use-axios';
import { useUser } from '@/src/contexts/use-user';
import { Capsule } from '@/src/features/capsule/types/capsule.types';
import { useQuery } from '@tanstack/react-query';

type FetchCapsulesResponse = {
  items: Capsule[];
};

type UseFetchCapsulesRankedProps = {
  params: {
    subThemeCapsuleId?: string;
  };
};

export const useFetchCapsulesRanked = (
  { params, ...rest }: UseFetchCapsulesRankedProps = { params: {} },

) => {
  const queryKey = ['capsules-ranked', JSON.stringify(params)];
  const { bearerTokenSelen } = useUser();
  const axios = useAxios();
  const { data, ...restQuery } = useQuery<Capsule[], Error>({
    queryKey,
    queryFn: async () => {
      const { data } = await axios.get<FetchCapsulesResponse>('/capsules/ranked', {
        params,
      });
      return data.items || [];
    },
    enabled: !!bearerTokenSelen,
    ...rest,
  });

  return { data, ...restQuery };
};
