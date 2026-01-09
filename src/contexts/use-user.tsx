import { useFetchMe } from "@/src/features/user/hooks/use-fetch-me";
import { useTokenStorage } from "@/src/features/user/hooks/use-token-storage";
import { User } from "@/types/user";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
type UserContextReturn = {
  bearerTokenSelen: string | null;
  user: User | null;
  setUserStorage: (user: User) => Promise<User>;
  logout: () => Promise<void>;
  isLoadingUser: boolean;
};

const UserContext = createContext<UserContextReturn | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [bearerTokenSelen, setBearerTokenSelen] = useState<string | null>(null);

  const { removeToken, getToken } = useTokenStorage();
  const { data: dataUser, isLoading: isLoadingUser } =
    useFetchMe(bearerTokenSelen);
  const { user: userDataAPI } = dataUser || {};

  const USER_STORAGE_KEY = "selen_user";

  const setUserStorage = async (user: User): Promise<User> => {
    await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    setUser(user);
    return user;
  };

  const logout = async (): Promise<void> => {
    await AsyncStorage.removeItem(USER_STORAGE_KEY);
    setUser(null);
    removeToken();
  };

  useEffect(() => {
    getToken().then((token) => {
      setBearerTokenSelen(token);
    });
  }, [getToken]);

  useEffect(() => {
    if (userDataAPI) {
      setUser(userDataAPI);
    }
  }, [userDataAPI]);

  return (
    <UserContext.Provider
      value={{ logout, user, setUserStorage, bearerTokenSelen, isLoadingUser }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) {
    throw new Error("useUser must be used inside <UserProvider>");
  }
  return ctx;
}
