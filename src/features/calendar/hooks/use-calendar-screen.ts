import {
  useCalendarStats,
  UseCalendarStatsReturn,
} from '@/src/features/calendar/hooks/use-calendar-stats';
import { useMarkedCapsulesResponses } from '@/src/features/calendar/hooks/use-marked-capsules-response';
import { useMarkedInnerWeatherResponses } from '@/src/features/calendar/hooks/use-marked-inner-weather-responses';
import {
  MarkedDates,
  mergeMarkedDates,
} from '@/src/features/calendar/utils/merge-marked-dates';
import { useFetchCapsulesResponse } from '@/src/features/capsule-reponse/hooks/use-fetch-capsules-response';
import { useFetchInnerWeathersResponses } from '@/src/features/inner-weather-response/hooks/use-fetch-inner-weathers-responses';
import dayjs from 'dayjs';
import { router } from 'expo-router';
import { useState } from 'react';
import { DateData } from 'react-native-calendars';

export type UseCalendarScreenProps = {
  isLoadingCapsulesResponses: boolean;
  isLoadingInnerWeathersResponses: boolean;
  stats: UseCalendarStatsReturn;
  markedDates: MarkedDates;
  onDayPress: (day: DateData) => void;
  onMonthChange: (month: DateData) => void;
};
export function useCalendarScreen() {
  const { data: capsuleResponses, isLoading: isLoadingCapsulesResponses } =
    useFetchCapsulesResponse();
  const {
    data: innerWeatherResponses,
    isLoading: isLoadingInnerWeathersResponses,
  } = useFetchInnerWeathersResponses();
  const [period, setPeriod] = useState(dayjs().format('YYYY-MM'));

  const markedCapsulesDates = useMarkedCapsulesResponses(capsuleResponses);
  const markedInnerWeathersDates = useMarkedInnerWeatherResponses(
    innerWeatherResponses,
  );
  const markedDates = mergeMarkedDates(
    markedCapsulesDates,
    markedInnerWeathersDates,
  );
  const stats = useCalendarStats(capsuleResponses, period);
  const handleDayPress = (day: DateData) => {
    const response = capsuleResponses?.find(
      (item) => dayjs(item.createdAt).format('YYYY-MM-DD') === day.dateString,
    );

    if (!response) return;

    router.push(`/capsule-response-detail?id=${response.id}`);
  };

  const handleMonthChange = (month: DateData) => {
    setPeriod(dayjs(month.dateString).format('YYYY-MM'));
  };

  return {
    isLoadingCapsulesResponses,
    isLoadingInnerWeathersResponses,
    markedDates,
    stats,
    onDayPress: handleDayPress,
    onMonthChange: handleMonthChange,
  };
}
