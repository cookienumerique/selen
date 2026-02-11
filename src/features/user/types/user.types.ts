export type User = {
  uid: string | null;
  email: string | null;
  roles: string[];
  name: string | null;
  firstName: string | null;
  picture?: string | null;
  createdAt: string;
};
