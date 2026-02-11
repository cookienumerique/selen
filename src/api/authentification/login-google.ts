import { selenAPIClient } from '@/src/api/client';
import { User } from '@/src/features/user/types/user.types';
export type LoginGoogleResponse = {
  token: string;
  user: User;
};

export type LoginGoogleProps = {
  idToken: string;
};

export const loginGoogle = async ({
  idToken,
}: LoginGoogleProps): Promise<LoginGoogleResponse> => {
  const response = await selenAPIClient.post('/auth/google', {
    idToken,
  });
  return response.data;
};
