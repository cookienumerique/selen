import { useAxios } from '@/src/api/use-axios';
import { JournalEntry } from '@/src/features/journal/types/journal-entry.types';
import { MutationOptions, useMutation } from '@tanstack/react-query';

export type UseCreateJournalEntryPayload = {
  content: string;
};

export const useCreateJournalEntry = (
  props?: MutationOptions<JournalEntry, Error, UseCreateJournalEntryPayload>,
) => {
  const axios = useAxios();

  return useMutation<JournalEntry, Error, UseCreateJournalEntryPayload>({
    mutationFn: async ({ content }) => {
      const { data } = await axios.post<{ item: JournalEntry }>(
        `/journal-entry`,
        { content },
      );
      return data.item;
    },
    ...props,
  });
};