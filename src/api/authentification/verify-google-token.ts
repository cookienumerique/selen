import { selenAPIClient } from "@/src/api/axios";

export const verifyGoogleToken = async (idToken: string) => {
  const response = await selenAPIClient.post("/auth/google", {
    idToken,
  });

  return response.data;
};
