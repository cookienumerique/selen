import { AppEnv } from '@/src/config/env.type';
import Constants from 'expo-constants';

const extra = Constants.expoConfig?.extra ?? {};

export const env: AppEnv = {
  VERSION: extra.VERSION ?? '',
  BUILD_ANDROID: extra.BUILD_ANDROID ?? '',
  BUILD_IOS: extra.BUILD_IOS ?? '',
  SUPPORT_MAIL: extra.SUPPORT_MAIL ?? '',
  SELEN_API: extra.SELEN_API ?? '',
};
