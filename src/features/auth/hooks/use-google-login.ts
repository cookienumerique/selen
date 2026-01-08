import { useUser } from "@/src/contexts/use-user";
import {
  AuthResponse,
  useFetchUserByGoogleToken,
} from "@/src/features/auth/hooks/use-fetch-user-by-google-token";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { useState } from "react";

export const useGoogleLogin = () => {
  const [isLoadingGoogleSignIn, setIsLoadingGoogleSignIn] =
    useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const {
    mutateAsync: verifyGoogleToken,
    isPending: isLoadingVerifyGoogleToken,
  } = useFetchUserByGoogleToken({
    onSuccess: (data: AuthResponse) => {
      const user = data.user;

      setUserStorage(user);
    },
    onError: (error: Error) => {
      setError(error);
    },
  });

  const { setUserStorage } = useUser();

  const login = async (): Promise<AuthResponse | undefined> => {
    setIsLoadingGoogleSignIn(true);
    setError(null);
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    try {
      const result = await GoogleSignin.signIn();
      if (!result.data?.idToken) {
        throw new Error("Google Sign-In failed: No idToken returned");
      }
      const { idToken } = result.data;
      return verifyGoogleToken(idToken);
    } catch (error: any) {
      console.log("error", error);
      setError(error);
      return undefined;
    } finally {
      setIsLoadingGoogleSignIn(false);
    }
  };
  const isLoading = isLoadingVerifyGoogleToken || isLoadingGoogleSignIn;
  return { login, isLoading, error };
};
