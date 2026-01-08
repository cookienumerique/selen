import { verifyGoogleToken } from "@/src/api/authentification/verify-google-token";
import { User } from "@/types/user";
import { MutationOptions, useMutation } from "@tanstack/react-query";

export type AuthResponse = {
  token: string;
  user: User;
};

export const useFetchUserByGoogleToken = (
  props: MutationOptions<AuthResponse, Error, string>
) => {
  return useMutation<AuthResponse, Error, string>({
    mutationFn: (googleToken: string) => verifyGoogleToken(googleToken),
    ...props,
  });
};
