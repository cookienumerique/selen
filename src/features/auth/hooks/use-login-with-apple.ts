import {
  LoginAppleProps,
  LoginAppleResponse,
  loginInApple,
} from '@/src/api/authentification/login-apple';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';

export const useLoginWithApple = (
  options?: UseMutationOptions<LoginAppleResponse, Error, LoginAppleProps>,
) => {
  return useMutation<LoginAppleResponse, Error, LoginAppleProps>({
    mutationFn: loginInApple,
    ...options,
  });
};
