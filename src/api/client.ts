import { env } from '@/src/config/env';
import axios from 'axios';

export const selenAPIClient = axios.create({
  baseURL: env.SELEN_API,
  timeout: 10000,
});
