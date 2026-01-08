import { env } from "@/src/config/env";
import axios, { AxiosError } from "axios";

export const selenAPIClient = axios.create({
  baseURL: env.SELEN_API,
  timeout: 10000,
});

/**
 * REQUEST LOGGER
 */
selenAPIClient.interceptors.request.use(
  (config) => {
    // console.log("➡️ API REQUEST", {
    //   method: config.method?.toUpperCase(),
    //   url: config.baseURL + config.url,
    //   headers: config.headers,
    //   data: config.data,
    // });

    // Exemple quand tu auras le token
    // config.headers.Authorization = `Bearer ${token}`;

    return config;
  },
  (error) => {
    // console.error("❌ API REQUEST ERROR", error);
    return Promise.reject(error);
  }
);

/**
 * RESPONSE LOGGER
 */
selenAPIClient.interceptors.response.use(
  (response) => {
    // console.log("✅ API RESPONSE", {
    //   url: response.config.url,
    //   status: response.status,
    //   data: response.data,
    // });

    return response;
  },
  (error: AxiosError<any>) => {
    // console.error("🚨 API RESPONSE ERROR", {
    //   url: error.config?.url,
    //   method: error.config?.method,
    //   status: error.response?.status,
    //   data: error.response?.data,
    //   message: error.message,
    // });

    return Promise.reject(error);
  }
);
