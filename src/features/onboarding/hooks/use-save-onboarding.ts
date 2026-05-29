import { useAxios } from '@/src/api/use-axios';
import { useUser } from '@/src/contexts/use-user';
import { SignupIntent } from '@/src/features/onboarding/types/onboarding.types';
import { User } from '@/src/features/user/types/user.types';
import { MutationOptions, useMutation } from '@tanstack/react-query';

export type SaveOnboardingPayload = {
  consentAccepted: boolean;
  intent?: SignupIntent | null;
  intentOther?: string | null;
};

export const useSaveOnboarding = (
  props?: MutationOptions<User, Error, SaveOnboardingPayload>,
) => {
  const axios = useAxios();
  const { setUser } = useUser();

  return useMutation<User, Error, SaveOnboardingPayload>({
    mutationFn: async (payload) => {
      const { data } = await axios.post<{ user: User }>(
        '/users/onboarding',
        payload,
      );
      return data.user;
    },
    ...props,
    onSuccess: (...args) => {
      setUser(args[0]);
      props?.onSuccess?.(...args);
    },
  });
};
