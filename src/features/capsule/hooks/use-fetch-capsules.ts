import { useAxios } from '@/src/api/axios';
import { useUser } from '@/src/contexts/use-user';
import { Capsule } from '@/src/features/capsule/types/capsule.types';
import { useQuery } from '@tanstack/react-query';

type FetchCapsulesResponse = {
  items: Capsule[];
};

type UseFetchCapsulesProps = {
  params: {
    subThemeCapsuleId?: string;
  };
}

export const useFetchCapsules = ({ params, ...rest }: UseFetchCapsulesProps = { params: {} }) => {
  const { bearerTokenSelen } = useUser();
  const axios = useAxios();
  const queryKey = ['capsules', JSON.stringify(params)];
  console.log('queryKey', queryKey);
  const { data, ...restQuery } = useQuery<Capsule[], Error>({
    queryKey,
    queryFn: async () => {
      const { data } = await axios.get<FetchCapsulesResponse>('/capsules', { params });
      return data.items || [];
    },
    enabled: !!bearerTokenSelen,
    ...rest,
  });

  return { data, ...restQuery };
};
