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
  user: User | null;
  setUserStorage: (user: User) => Promise<User>;
  logout: () => Promise<void>;
};

const UserContext = createContext<UserContextReturn | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const USER_STORAGE_KEY = "selen_user";

  const setUserStorage = async (user: User): Promise<User> => {
    await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    setUser(user);
    return user;
  };

  const getUserStorage = async (): Promise<User | null> => {
    const user = await AsyncStorage.getItem(USER_STORAGE_KEY);
    return user ? JSON.parse(user) : null;
  };

  const logout = async (): Promise<void> => {
    await AsyncStorage.removeItem(USER_STORAGE_KEY);
    setUser(null);
  };

  useEffect(() => {
    getUserStorage().then((user) => {
      setUser(user);
    });
  }, []);
  return (
    <UserContext.Provider value={{ logout, user, setUserStorage }}>
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
