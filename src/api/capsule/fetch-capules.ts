import { selenAPIClient } from "@/src/api/axios";
import { Capsule } from "@/types/capsule";
import { AxiosRequestConfig } from "axios";

type FetchCapsulesResponse = {
  capsules: Capsule[];
};

export const fetchCapsules = async (
  props?: AxiosRequestConfig
): Promise<FetchCapsulesResponse> => {
  const response = await selenAPIClient.get("/capsules", props);
  return response.data;
};
