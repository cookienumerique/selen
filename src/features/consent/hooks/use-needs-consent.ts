import { useUser } from '@/src/contexts/use-user';

export const useNeedsConsent = (): boolean => {
  const { user } = useUser();

  if (!user) return false;
  return user.consentAiOptin === null;
};
