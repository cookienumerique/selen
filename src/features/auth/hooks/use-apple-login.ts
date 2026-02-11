import { LoginAppleResponse } from '@/src/api/authentification/login-apple';
import { useUser } from '@/src/contexts/use-user';
import { useLoginWithApple } from '@/src/features/auth/hooks/use-login-with-apple';
import { useTokenStorage } from '@/src/features/user/hooks/use-token-storage';
import * as AppleAuthentication from 'expo-apple-authentication';
import { router } from 'expo-router';
import Toast from 'react-native-toast-message';

export const useAppleLogIn = () => {
  const { setToken } = useTokenStorage();
  const { setUser } = useUser();

  const {
    mutateAsync: loginWithApple,
    isPending: isLoadingLoginWithApple,
    error: errorLoginWithApple,
  } = useLoginWithApple({
    onSuccess: ({ user, token }: LoginAppleResponse) => {
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

  const login = async (): Promise<LoginAppleResponse | undefined> => {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });

      if (!credential.identityToken) {
        throw new Error('Apple Sign-In failed: No identityToken returned');
      }
      const { identityToken, fullName } = credential;

      const { givenName, familyName } = fullName ?? {};
      const response = await loginWithApple({
        identityToken,
        familyName,
        givenName,
      });
      return response;
    } catch (error) {
      console.error('e', error);
    }
  };
  return {
    login,
    isLoading: isLoadingLoginWithApple,
    error: errorLoginWithApple,
  };
};
