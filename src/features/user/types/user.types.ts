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
};
