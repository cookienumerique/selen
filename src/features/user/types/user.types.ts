export type Role = 'ROLE_USER';

export type User = {
  uid: string | null;
  email: string | null;
  roles: Role[];
  name: string | null;
  firstName: string | null;
  picture?: string | null;
  createdAt: string;
  consentAiOptin: boolean | null;
  // Date du consentement RGPD (ISO). null = onboarding pas validé, app bloquée.
  consentAt: string | null;
  // Intention déclarée à l'inscription (valeur anglaise de l'enum back-end), null si jamais renseignée.
  signupIntent: string | null;
  // Version de l'onboarding suivi (ex: "1.26").
  onboardingVersion: string | null;
};
