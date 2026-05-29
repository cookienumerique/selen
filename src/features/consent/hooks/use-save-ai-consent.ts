import { useAxios } from '@/src/api/use-axios';
import { useUser } from '@/src/contexts/use-user';
import { User } from '@/src/features/user/types/user.types';
import { MutationOptions, useMutation } from '@tanstack/react-query';

export type AiConsentTrigger = 'first_capsule' | 'first_journal' | 'settings';

export type UseSaveAiConsentPayload = {
  optin: boolean;
  trigger: AiConsentTrigger;
};

export const useSaveAiConsent = (
  props?: MutationOptions<User, Error, UseSaveAiConsentPayload>,
) => {
  const axios = useAxios();
  const { setUser } = useUser();

  return useMutation<User, Error, UseSaveAiConsentPayload>({
    mutationFn: async ({ optin, trigger }) => {
      const { data } = await axios.post<{ user: User }>('/users/consent-ai', {
        optin,
        trigger,
      });
      return data.user;
    },
    ...props,
    onSuccess: (...args) => {
      setUser(args[0]);
      props?.onSuccess?.(...args);
    },
  });
};
