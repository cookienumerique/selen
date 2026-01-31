import AsyncStorage from '@react-native-async-storage/async-storage';

type UseTokenStorageReturn = {
  getToken: () => Promise<string | null>;
  setToken: (token: string) => Promise<void>;
  removeToken: () => Promise<void>;
};

/**
 * @description Hook to get, set and remove the token from the storage
 * @returns {UseTokenStorageReturn}
 */
export const useTokenStorage = (): UseTokenStorageReturn => {
  const TOKEN_STORAGE_KEY = '@selen/token';

  const getToken = async (): Promise<string | null> => {
    const token = await AsyncStorage.getItem(TOKEN_STORAGE_KEY);
    return token;
  };

  const setToken = async (token: string): Promise<void> => {
    await AsyncStorage.setItem(TOKEN_STORAGE_KEY, token);
  };

  const removeToken = async (): Promise<void> => {
    await AsyncStorage.removeItem(TOKEN_STORAGE_KEY);
  };

  return {
    getToken,
    setToken,
    removeToken,
  };
};
