import {
  loginGoogle,
  LoginGoogleProps,
  LoginGoogleResponse,
} from '@/src/api/authentification/login-google';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';

export const useLoginWithGoogle = (
  options?: UseMutationOptions<LoginGoogleResponse, Error, LoginGoogleProps>,
) => {
  return useMutation<LoginGoogleResponse, Error, LoginGoogleProps>({
    mutationFn: loginGoogle,
    ...options,
  });
};
