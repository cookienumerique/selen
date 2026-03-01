import { useAxios } from "@/src/api/use-axios";
import { Subscription } from "@/src/features/subscription/types/subscription.types";
import { useMutation } from "@tanstack/react-query";

export type UseSubscribeApplePayload = {
    receipt: string
};

export type UseSubscribeAppleResponse = {
    item: Subscription;
}

export const useSubscribeApple = () => {
    const axios = useAxios();

    return useMutation({
        mutationFn: async ({ receipt }: UseSubscribeApplePayload) => {
            const { data } = await axios.post<UseSubscribeAppleResponse>(
                '/subscriptions/apple',
                { receipt },
            );
            return data;
        },
    });
}