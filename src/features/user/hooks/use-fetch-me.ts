import { fetchMe, FetchMeResponse } from "@/src/api/user/fetch-me";
import { useQuery } from "@tanstack/react-query";

export const useFetchMe = (token: string | null) => {
  return useQuery<FetchMeResponse>({
    queryKey: ["me"],
    queryFn: () => fetchMe({ headers: { Authorization: `Bearer ${token}` } }),
    enabled: !!token,
  });
};
