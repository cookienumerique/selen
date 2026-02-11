import { useAxios } from '@/src/api/use-axios';
import { MutationOptions, useMutation } from '@tanstack/react-query';

export const useDeleteMe = (props?: MutationOptions<void, Error, void>) => {
  const axios = useAxios();
  return useMutation<void, Error, void>({
    mutationFn: async () => {
      await axios.delete('/users/me');
    },
    ...props,
  });
};
