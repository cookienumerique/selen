import { useUser } from '@/src/contexts/use-user';
import { useEffect } from 'react';
import { selenAPIClient } from './client';
import { setupAxiosInterceptors } from './interceptors';

export const useAxios = () => {
  const { bearerTokenSelen } = useUser();

  useEffect(() => {
    setupAxiosInterceptors(bearerTokenSelen);
  }, [bearerTokenSelen]);

  return selenAPIClient;
};
