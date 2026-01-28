import {
  verifyGoogleToken,
  VerifyGoogleTokenResponse,
} from '@/src/api/authentification/verify-google-token';
import { MutationOptions, useMutation } from '@tanstack/react-query';

export const useFetchUserByGoogleToken = (
  props: MutationOptions<VerifyGoogleTokenResponse, Error, string>,
) => {
  return useMutation<VerifyGoogleTokenResponse, Error, string>({
    mutationFn: (googleToken: string) => verifyGoogleToken(googleToken),
    ...props,
  });
};
