import { fetchCapsules } from "@/src/api/capsule/fetch-capules";
import { useUser } from "@/src/contexts/use-user";
import { Capsule } from "@/types/capsule";
import { QueryOptions, useQuery } from "@tanstack/react-query";

type FetchCapsulesResponse = {
  capsules: Capsule[];
};
export const useFetchCapsules = (
  props?: QueryOptions<FetchCapsulesResponse, Error>
) => {
  const { bearerTokenSelen } = useUser();

  return useQuery<FetchCapsulesResponse, Error>({
    queryKey: ["capsules"],
    queryFn: async () => fetchCapsules(),
    enabled: !!bearerTokenSelen,
    ...props,
  });
};
