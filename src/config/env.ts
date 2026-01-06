import { AppEnv } from "@/src/config/env.type";
import Constants from "expo-constants";

const extra = Constants.expoConfig?.extra ?? {};

export const env: AppEnv = {
  VERSION: extra.VERSION ?? "",
  SUPPORT_MAIL: extra.SUPPORT_MAIL ?? "",
};
