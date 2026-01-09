import { selenAPIClient } from "@/src/api/axios";
import { User } from "@/types/user";
import { AxiosRequestConfig } from "axios";

export type FetchMeResponse = {
  user: User;
};

export const fetchMe = async (
  config: AxiosRequestConfig
): Promise<FetchMeResponse> => {
  const response = await selenAPIClient.get("/users/me", config);
  return response.data;
};
