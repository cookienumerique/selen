import { VerifyGoogleTokenResponse } from '@/src/api/authentification/verify-google-token';
import { useUser } from '@/src/contexts/use-user';
import { useFetchUserByGoogleToken } from '@/src/features/auth/hooks/use-fetch-user-by-google-token';
import { useTokenStorage } from '@/src/features/user/hooks/use-token-storage';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { router } from 'expo-router';
import { useState } from 'react';
import Toast from 'react-native-toast-message';

export const useGoogleLogin = () => {
  const { setToken } = useTokenStorage();
  const { setUser } = useUser();

  const [isLoadingGoogleSignIn, setIsLoadingGoogleSignIn] =
    useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const {
    mutateAsync: verifyGoogleToken,
    isPending: isLoadingVerifyGoogleToken,
  } = useFetchUserByGoogleToken({
    onSuccess: ({ user, token }: VerifyGoogleTokenResponse) => {
      setToken(token);
      setUser(user);
      router.push('/');
    },
    onError: (error: Error) => {
      console.error(error);
      Toast.show({
        type: 'error',
        text1: 'Erreur lors de la connexion',
        position: 'bottom',
        autoHide: false,
      });
    },
  });

  const login = async (): Promise<VerifyGoogleTokenResponse | undefined> => {
    setIsLoadingGoogleSignIn(true);
    setError(null);
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    try {
      const result = await GoogleSignin.signIn();
      if (!result.data?.idToken) {
        throw new Error('Google Sign-In failed: No idToken returned');
      }
      const { idToken } = result.data;
      console.log('idToken', idToken);
      return verifyGoogleToken(idToken);
    } catch (error: any) {
      console.log('error', error);
      setError(error);
      return undefined;
    } finally {
      setIsLoadingGoogleSignIn(false);
    }
  };
  const isLoading = isLoadingVerifyGoogleToken || isLoadingGoogleSignIn;
  return { login, isLoading, error };
};
