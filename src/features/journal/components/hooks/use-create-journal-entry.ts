import { useAxios } from '@/src/api/use-axios';
import { Journal } from '@/src/features/journal/types/journal.types';
import { MutationOptions, useMutation } from '@tanstack/react-query';

export type UseCreateJournalEntryPayload = {
  content: string;
};

export const useCreateJournalEntry = (
  props?: MutationOptions<Journal, Error, UseCreateJournalEntryPayload>,
) => {
  const axios = useAxios();

  return useMutation<Journal, Error, UseCreateJournalEntryPayload>({
    mutationFn: async ({ content }) => {
      const { data } = await axios.post<{ item: Journal }>(
        `/journal-entry`,
        { content },
      );
      console.log('XXXXX', data)
      return data.item;
    },
    ...props,
  });
};