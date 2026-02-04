import { env } from '@/src/config/env';
import { useUser } from '@/src/contexts/use-user';
import axios, { AxiosError } from 'axios';

export const selenAPIClient = axios.create({
  baseURL: env.SELEN_API,
  timeout: 10000,
});

const debug = false;

export const useAxios = () => {
  const { bearerTokenSelen } = useUser();
  selenAPIClient.interceptors.request.use(
    (config) => {
      if (debug) {
        console.log('➡️ API REQUEST', {
          method: config.method?.toUpperCase(),
          url: (config?.baseURL ?? '') + (config?.url ?? ''),
          headers: config.headers,
          data: config.data,
        });
      }

      if (bearerTokenSelen) {
        config.headers.Authorization = `Bearer ${bearerTokenSelen}`;
      }

      return config;
    },
    (error) => {
      if (debug) {
        console.error('❌ API REQUEST ERROR', error);
      }
      return Promise.reject(error);
    },
  );

  /**
   * RESPONSE LOGGER
   */
  selenAPIClient.interceptors.response.use(
    (response) => {
      if (debug) {
        console.log('✅ API RESPONSE', {
          url: response.config.url,
          status: response.status,
          data: response.data,
        });
      }
      return response;
    },
    (error: AxiosError<any>) => {
      if (debug) {
        console.error('🚨 API RESPONSE ERROR', {
          url: error.config?.url,
          method: error.config?.method,
          status: error.response?.status,
          data: error.response?.data,
          message: error.message,
        });
      }

      return Promise.reject(error);
    },
  );

  return selenAPIClient;
};
