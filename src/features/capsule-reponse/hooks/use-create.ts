import { useAxios } from "@/src/api/axios";
import { MutationOptions, useMutation } from "@tanstack/react-query";

export type CreateCapsuleResponsePayload = {
    capsuleId: number;
    response: string;
};

export const useCreateCapsuleResponse = (props?: MutationOptions<void, Error, CreateCapsuleResponsePayload>) => {
    const axios = useAxios();

    return useMutation<void, Error, CreateCapsuleResponsePayload>({
        mutationFn: async ({ capsuleId, response }) => {
            await axios.post("/capsules-response", {
                capsuleId,
                response,
            });
        },
        ...props
    });
};