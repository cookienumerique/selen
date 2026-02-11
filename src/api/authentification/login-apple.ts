import { selenAPIClient } from '@/src/api/client';
import { User } from '@/src/features/user/types/user.types';

export type LoginAppleResponse = {
  token: string;
  user: User;
};

export type LoginAppleProps = {
  identityToken: string;
  familyName: string | null | undefined;
  givenName: string | null | undefined;
};

export const loginInApple = async ({
  identityToken,
  familyName,
  givenName,
}: LoginAppleProps): Promise<LoginAppleResponse> => {
  const response = await selenAPIClient.post('/auth/apple', {
    identityToken,
    familyName,
    givenName,
  });

  console.log('response', response.data);
  return response.data;
};
