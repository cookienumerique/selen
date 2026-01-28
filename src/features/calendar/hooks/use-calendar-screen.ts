import {
  useCalendarStats,
  UseCalendarStatsReturn,
} from '@/src/features/calendar/hooks/use-calendar-stats';
import {
  useMarkedDates,
  UseMarkedDatesReturn,
} from '@/src/features/calendar/hooks/use-marked-dates';
import { useFetchCapsulesResponse } from '@/src/features/capsule-reponse/hooks/use-fetch-capsules-response';
import dayjs from 'dayjs';
import { router } from 'expo-router';
import { useState } from 'react';
import { DateData } from 'react-native-calendars';

export type UseCalendarScreenProps = {
  isLoading: boolean;
  stats: UseCalendarStatsReturn;
  markedDates: UseMarkedDatesReturn;
  onDayPress: (day: DateData) => void;
  onMonthChange: (month: DateData) => void;
};
export function useCalendarScreen() {
  const { data, isLoading } = useFetchCapsulesResponse();
  const [period, setPeriod] = useState(dayjs().format('YYYY-MM'));

  const markedDates = useMarkedDates(data);
  const stats = useCalendarStats(data, period);

  const handleDayPress = (day: DateData) => {
    const response = data?.find(
      (item) => dayjs(item.createdAt).format('YYYY-MM-DD') === day.dateString,
    );

    if (!response) return;

    router.push(`/capsule-response-detail?id=${response.id}`);
  };

  const handleMonthChange = (month: DateData) => {
    setPeriod(dayjs(month.dateString).format('YYYY-MM'));
  };

  return {
    isLoading,
    markedDates,
    stats,
    onDayPress: handleDayPress,
    onMonthChange: handleMonthChange,
  };
}
