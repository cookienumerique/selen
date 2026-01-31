import { useAxios } from '@/src/api/axios';
import { useUser } from '@/src/contexts/use-user';
import { Capsule } from '@/src/features/capsule/types/capsule.types';
import { QueryOptions, useQuery } from '@tanstack/react-query';

type FetchCapsulesResponse = {
  items: Capsule[];
};

export const useFetchCapsules = (props?: QueryOptions<Capsule[], Error>) => {
  const { bearerTokenSelen } = useUser();
  const axios = useAxios();

  const { data, ...rest } = useQuery<Capsule[], Error>({
    queryKey: ['capsules'],
    queryFn: async () => {
      const { data } = await axios.get<FetchCapsulesResponse>('/capsules');
      return data.items || [];
    },
    enabled: !!bearerTokenSelen,
    ...props,
  });

  return { data, ...rest };
};
