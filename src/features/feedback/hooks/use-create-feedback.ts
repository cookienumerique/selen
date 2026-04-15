import { useAxios } from '@/src/api/use-axios';
import { Feedback } from '@/src/features/feedback/types/feedback.types';
import { MutationOptions, useMutation } from '@tanstack/react-query';

export type UseCreateFeedbackPayload = Omit<Feedback, 'id' | 'createdAt'>;

export const useCreateFeedback = (
  props?: MutationOptions<void, Error, UseCreateFeedbackPayload>,
) => {
  const axios = useAxios();

  return useMutation<void, Error, UseCreateFeedbackPayload>({
    mutationFn: async (feedback) => {
      await axios.post('/feedbacks', feedback);
    },
    ...props,
  });
};
