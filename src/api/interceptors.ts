// src/api/interceptors.ts
import { AxiosError } from 'axios';
import { selenAPIClient } from './client';

const debug = false;

export const setupAxiosInterceptors = (token?: string | null) => {
  // selenAPIClient.interceptors.request.clear();
  // selenAPIClient.interceptors.response.clear();

  selenAPIClient.interceptors.request.use(
    (config) => {
      if (debug) {
        console.log('➡️ API REQUEST', {
          method: config.method?.toUpperCase(),
          url: (config.baseURL ?? '') + (config.url ?? ''),
          data: config.data,
        });
      }

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    },
    (error) => {
      console.log(error.request);
      Promise.reject(error);
    },
  );

  selenAPIClient.interceptors.response.use(
    (response) => {
      if (debug) {
        console.log('✅ API RESPONSE', response.data);
      }
      return response;
    },
    (error: AxiosError) => {
      if (debug) {
        console.error(error.request);
        console.error('🚨 API ERROR', error.response?.data);
      }
      return Promise.reject(error);
    },
  );
};
