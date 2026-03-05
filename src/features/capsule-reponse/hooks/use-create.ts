import { useAxios } from '@/src/api/use-axios';
import { CapsuleResponse } from '@/src/features/capsule-reponse/types/capsule-response.types';
import { MutationOptions, useMutation } from '@tanstack/react-query';

export type CreateCapsuleResponsePayload = {
  capsuleId: number;
  response: string;
};

export const useCreateCapsuleResponse = (
  props?: MutationOptions<CapsuleResponse, Error, CreateCapsuleResponsePayload>,
) => {
  const axios = useAxios();
  return useMutation<CapsuleResponse, Error, CreateCapsuleResponsePayload>({
    mutationFn: async ({ capsuleId, response }) => {
      const { data } = await axios.post<{ item: CapsuleResponse }>(
        '/capsules-response',
        {
          capsuleId,
          response,
        },
      );
      return data.item;
    },
    ...props,
  });
};
