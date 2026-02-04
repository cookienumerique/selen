import { InnerWeatherResponse } from '@/src/features/inner-weather-response/types/inner-weather-response.types';
import { getInnerWeatherColor } from '@/src/features/inner-weather/utils/get-inner-weather-color';
import dayjs from 'dayjs';
import { useMemo } from 'react';
import { MarkingProps } from 'react-native-calendars/src/calendar/day/marking';
export type UseMarkedInnerWeatherResponsesReturn = Record<string, MarkingProps>;

export function useMarkedInnerWeatherResponses(
  innerWeatherResponses: InnerWeatherResponse[] | undefined,
): UseMarkedInnerWeatherResponsesReturn {
  return useMemo(() => {
    if (!innerWeatherResponses) return {};

    return innerWeatherResponses.reduce<Record<string, MarkingProps>>(
      (acc, item) => {
        const date = dayjs(item.day).format('YYYY-MM-DD');

        acc[date] = {
          marked: true,
          dots: [{ color: getInnerWeatherColor(item.innerWeather.code) }],
        };

        return acc;
      },
      {},
    );
  }, [innerWeatherResponses]);
}
