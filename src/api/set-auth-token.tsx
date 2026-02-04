import { selenAPIClient } from './client';

export const setAuthToken = (token?: string) => {
  if (token) {
    selenAPIClient.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete selenAPIClient.defaults.headers.common.Authorization;
  }
};
