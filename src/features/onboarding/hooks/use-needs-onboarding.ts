import { useUser } from '@/src/contexts/use-user';

// L'onboarding (dont le consentement RGPD art. 9) est requis tant que consentAt est vide.
// Remplace l'ancien critère basé sur consentAiOptin, car l'opt-in IA est désormais contextuel
// (demandé avant la 1ère capsule ou le 1er journal), pas à l'onboarding.
export const useNeedsOnboarding = (): boolean => {
  const { user } = useUser();

  if (!user) return false;
  return user.consentAt === null;
};
