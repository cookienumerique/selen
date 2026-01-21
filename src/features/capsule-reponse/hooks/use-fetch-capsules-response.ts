import { useAxios } from "@/src/api/axios";
import { useUser } from "@/src/contexts/use-user";
import { CapsuleResponse } from "@/types/capsule-response";
import { QueryOptions, useQuery } from "@tanstack/react-query";

type FetchCapsulesResponse = {
  items: CapsuleResponse[];
};

export const useFetchCapsulesResponse = (
  props?: QueryOptions<CapsuleResponse[], Error>
) => {
  const { bearerTokenSelen } = useUser();
  const axios = useAxios();

  const { data, ...rest } = useQuery<CapsuleResponse[], Error>({
    queryKey: ["capsules-responses"],
    queryFn: async () => {
      const { data } = await axios.get<FetchCapsulesResponse>("/capsules-response");
      return data.items || [];
    },
    enabled: !!bearerTokenSelen,
    ...props,
  });

  return { data, ...rest };
};