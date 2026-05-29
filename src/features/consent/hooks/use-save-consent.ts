import { useAxios } from '@/src/api/use-axios';
import { useUser } from '@/src/contexts/use-user';
import { User } from '@/src/features/user/types/user.types';
import { MutationOptions, useMutation } from '@tanstack/react-query';

export type UseSaveConsentPayload = {
  aiOptin: boolean;
};

// TODO (cleanup) : façon legacy d'enregistrer l'opt-in IA via /users/consent. Remplacée par useSaveAiConsent (/users/consent-ai)
// et useSaveOnboarding (/users/onboarding). À supprimer avec son appel dans privacy-screen.tsx.
export const useSaveConsent = (
  props?: MutationOptions<User, Error, UseSaveConsentPayload>,
) => {
  const axios = useAxios();
  const { setUser } = useUser();

  return useMutation<User, Error, UseSaveConsentPayload>({
    mutationFn: async ({ aiOptin }) => {
      const { data } = await axios.post<{ user: User }>('/users/consent', {
        aiOptin,
      });
      return data.user;
    },
    onSuccess: (user, variables, context) => {
      setUser(user);
      props?.onSuccess?.(user, variables, context);
    },
    ...props,
  });
};
