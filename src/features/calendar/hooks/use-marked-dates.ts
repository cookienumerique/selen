import { Colors } from '@/src/constants/theme';
import { CapsuleResponse } from '@/types/capsule-response';
import dayjs from 'dayjs';
import { useMemo } from 'react';
import { MarkingProps } from 'react-native-calendars/src/calendar/day/marking';

export type UseMarkedDatesReturn = Record<string, MarkingProps>;

export function useMarkedDates(data: CapsuleResponse[] | undefined) {
  return useMemo(() => {
    if (!data) return {};

    return data.reduce<Record<string, MarkingProps>>((acc, item) => {
      const date = dayjs(item.createdAt).format('YYYY-MM-DD');

      acc[date] = {
        marked: true,
        dotColor: Colors.capsule,
      };

      return acc;
    }, {});
  }, [data]);
}
