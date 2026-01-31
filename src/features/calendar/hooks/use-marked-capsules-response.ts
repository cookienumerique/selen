import { Colors } from '@/src/constants/theme';
import { CapsuleResponse } from '@/src/features/capsule-reponse/types/capsule-response.types';
import dayjs from 'dayjs';
import { useMemo } from 'react';
import { MarkingProps } from 'react-native-calendars/src/calendar/day/marking';

type MarkedDates = Record<string, MarkingProps>;

export function useMarkedCapsulesResponses(
  capsuleResponses: CapsuleResponse[] | undefined
): MarkedDates {
  return useMemo(() => {
    if (!capsuleResponses) return {};

    return capsuleResponses.reduce<MarkedDates>((acc, item) => {
      const date = dayjs(item.createdAt).format('YYYY-MM-DD');

      if (!acc[date]) {
        acc[date] = { marked: true, dots: [] };
      }

      acc[date].dots!.push({
        key: `capsule-${item.id}`,
        color: Colors.capsule,
      });

      return acc;
    }, {});
  }, [capsuleResponses]);
}