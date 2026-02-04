import { selenAPIClient } from '@/src/api/client';
import { User } from '@/src/features/user/types/user.types';
export type VerifyGoogleTokenResponse = {
  token: string;
  user: User;
};

export const verifyGoogleToken = async (
  idToken: string,
): Promise<VerifyGoogleTokenResponse> => {
  const response = await selenAPIClient.post('/auth/google', {
    idToken,
  });

  return response.data;
};
