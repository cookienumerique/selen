import { LoginGoogleResponse } from '@/src/api/authentification/login-google';
import { useUser } from '@/src/contexts/use-user';
import { useLoginWithGoogle } from '@/src/features/auth/hooks/use-login-with-google';
import { useTokenStorage } from '@/src/features/user/hooks/use-token-storage';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { router } from 'expo-router';
import { useState } from 'react';
import Toast from 'react-native-toast-message';

export const useGoogleLogIn = () => {
  const { setToken } = useTokenStorage();
  const { setUser } = useUser();

  const [isLoadingGoogleSignIn, setIsLoadingGoogleSignIn] =
    useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const {
    mutateAsync: verifyGoogleToken,
    isPending: isLoadingVerifyGoogleToken,
  } = useLoginWithGoogle({
    onSuccess: ({ user, token }: LoginGoogleResponse) => {
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

  const login = async (): Promise<LoginGoogleResponse | undefined> => {
    setIsLoadingGoogleSignIn(true);
    setError(null);
    await GoogleSignin.hasPlayServices({
      showPlayServicesUpdateDialog: true,
    });
    try {
      const result = await GoogleSignin.signIn();
      if (!result.data?.idToken) {
        return;
      }
      const { idToken } = result.data;

      return verifyGoogleToken({ idToken });
    } catch (error: any) {
      setError(error);
      return undefined;
    } finally {
      setIsLoadingGoogleSignIn(false);
    }
  };
  const isLoading = isLoadingVerifyGoogleToken || isLoadingGoogleSignIn;
  return { login, isLoading, error };
};
