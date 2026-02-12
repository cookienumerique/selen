import { useAxios } from '@/src/api/use-axios';
import { CapsuleResponse } from '@/src/features/capsule-reponse/types/capsule-response.types';
import { MutationOptions, useMutation } from '@tanstack/react-query';

export type UpdateCapsuleResponsePayload = {
  id: number;
  response: string;
};

export const useUpdateCapsuleResponse = (
  props?: MutationOptions<CapsuleResponse, Error, UpdateCapsuleResponsePayload>,
) => {
  const axios = useAxios();

  return useMutation<CapsuleResponse, Error, UpdateCapsuleResponsePayload>({
    mutationFn: async ({ id, response }) => {
      console.log({ id, response });
      const { data } = await axios.patch<CapsuleResponse>(
        `/capsule-responses/${id}`,
        { response },
      );

      return data;
    },
    ...props,
  });
  
};
