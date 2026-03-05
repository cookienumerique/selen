import { useAxios } from '@/src/api/use-axios';
import { useQuery } from '@tanstack/react-query';

type FetchOpenedCapsulesResponse = {
  total: number;
};

export const useFetchOpenedCapsulesResponse = () => {
  const queryKey = ['opened-capsules-response'];
  const axios = useAxios();
  const { data, ...restQuery } = useQuery<FetchOpenedCapsulesResponse, Error>({
    queryKey,
    queryFn: async () => {
      const { data } = await axios.get<FetchOpenedCapsulesResponse>(
        '/stats/capsules-response/opened',
      );
      return data ?? { total: 0 };
    },
  });
  return { data, ...restQuery };
};
