import dayjs from 'dayjs';
import { router } from 'expo-router';
import React, { createContext, useContext, useMemo, useState } from 'react';
import { DateData } from 'react-native-calendars';

import { useCalendarStats } from '@/src/features/calendar/hooks/use-calendar-stats';
import { useMarkedCapsulesResponses } from '@/src/features/calendar/hooks/use-marked-capsules-response';
import { useMarkedInnerWeatherResponses } from '@/src/features/calendar/hooks/use-marked-inner-weather-responses';
import { MarkedDates, mergeMarkedDates } from '@/src/features/calendar/utils/merge-marked-dates';
import { useFetchCapsulesResponse } from '@/src/features/capsule-reponse/hooks/use-fetch-capsules-response';
import { useFetchInnerWeathersResponses } from '@/src/features/inner-weather-response/hooks/use-fetch-inner-weathers-responses';

type CalendarContextType = {
  period: string;
  markedDates: MarkedDates;
  stats: ReturnType<typeof useCalendarStats>;
  isLoadingCapsules: boolean;
  isLoadingWeather: boolean;
  onDayPress: (day: DateData) => void;
  onMonthChange: (month: DateData) => void;
};

const CalendarContext = createContext<CalendarContextType | null>(null);

export const CalendarProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: capsuleResponses, isLoading: isLoadingCapsules } =
    useFetchCapsulesResponse();

  const { data: innerWeatherResponses, isLoading: isLoadingWeather } =
    useFetchInnerWeathersResponses();

  const [period, setPeriod] = useState(dayjs().format('YYYY-MM'));

  const markedCapsulesDates = useMarkedCapsulesResponses(capsuleResponses);
  const markedInnerWeathersDates =
    useMarkedInnerWeatherResponses(innerWeatherResponses);

  const markedDates = useMemo(
    () => mergeMarkedDates(markedCapsulesDates, markedInnerWeathersDates),
    [markedCapsulesDates, markedInnerWeathersDates],
  );

  const stats = useCalendarStats(capsuleResponses, period);

  const handleDayPress = (day: DateData) => {
    const response = capsuleResponses?.find(
      (item) =>
        dayjs(item.createdAt).format('YYYY-MM-DD') === day.dateString,
    );

    if (!response) return;

    router.push(`/capsule-response-detail?id=${response.id}`);
  };

  const handleMonthChange = (month: DateData) => {
    setPeriod(dayjs(month.dateString).format('YYYY-MM'));
  };

  const value: CalendarContextType = {
    period,
    markedDates,
    stats,
    isLoadingCapsules,
    isLoadingWeather,
    onDayPress: handleDayPress,
    onMonthChange: handleMonthChange,
  };

  return (
    <CalendarContext.Provider value={value}>
      {children}
    </CalendarContext.Provider>
  );
};

export const useCalendar = () => {
  const context = useContext(CalendarContext);
  if (!context) {
    throw new Error('useCalendar must be used within CalendarProvider');
  }
  return context;
};