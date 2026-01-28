import { selenAPIClient } from '@/src/api/axios';
import { User } from '@/types/user';
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
