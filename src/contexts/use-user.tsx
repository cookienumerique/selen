import { selenAPIClient } from '@/src/api/client';
import { setAuthToken } from '@/src/api/set-auth-token';
import { useTokenStorage } from '@/src/features/user/hooks/use-token-storage';
import { User } from '@/src/features/user/types/user.types';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

export type UserContextReturn = {
  bearerTokenSelen: string | null;
  user: User | null;
  isPremium: boolean;
  setUser: (user: User) => void;
  logout: () => Promise<void>;
  isLoadingUser: boolean;
};

const UserContext = createContext<UserContextReturn | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoadingUser, setIsLoadingUser] = useState(false);
  const [bearerTokenSelen, setBearerTokenSelen] = useState<string | null>(null);
  const { removeToken, getToken } = useTokenStorage();
  const logout = async (): Promise<void> => {
    await removeToken();
    setAuthToken();
    setUser(null);
    setBearerTokenSelen(null);
  };

  useEffect(() => {
    getToken().then((token) => {
      setBearerTokenSelen(token);
      setIsLoadingUser(true);
      try {
        if (user || !token) return;
        selenAPIClient
          .get('/users/me', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            setUser(response.data?.user);
            setAuthToken(token);
          });
      } catch (error) {
        console.error(error);
        setIsLoadingUser(false);
      } finally {
        setIsLoadingUser(false);
      }
    });
  }, [getToken, user]);

  const isPremium = false

  return (
    <UserContext.Provider
      value={{
        logout,
        user,
        setUser,
        bearerTokenSelen,
        isLoadingUser,
        isPremium,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) {
    throw new Error('useUser must be used inside <UserProvider>');
  }
  return ctx;
}
