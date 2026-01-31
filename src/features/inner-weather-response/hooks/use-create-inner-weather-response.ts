import { useAxios } from '@/src/api/axios';
import { MutationOptions, useMutation } from '@tanstack/react-query';

export type UseCreateInnerWeatherResponsePayload = {
    innerWeatherId: string;
};

export const useCreateInnerWeatherResponse = (
    props?: MutationOptions<void, Error, UseCreateInnerWeatherResponsePayload>,
) => {
    const axios = useAxios();

    return useMutation<void, Error, UseCreateInnerWeatherResponsePayload>({
        mutationFn: async ({ innerWeatherId }) => {
            await axios.post('/inner-weather-responses', {
                innerWeatherId,
            });
        },
        ...props,
    });
};
