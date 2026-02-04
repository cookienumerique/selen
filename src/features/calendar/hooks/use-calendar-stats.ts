import { formatStreakRange } from '@/src/features/calendar/utils/format-streak-range';
import { getMaxStreakRangeForMonth } from '@/src/features/calendar/utils/get-max-streak-for-month';
import { CapsuleResponse } from '@/src/features/capsule-reponse/types/capsule-response.types';

export type UseCalendarStatsReturn = {
  totalCapsules: number;
  maxStreak: number;
  formattedRange: string | undefined;
};
export function useCalendarStats(
  data: CapsuleResponse[] | undefined,
  period: string,
) {
  const maxStreakRange = getMaxStreakRangeForMonth(data, period);
  const formattedRange = maxStreakRange
    ? formatStreakRange(maxStreakRange)
    : undefined;

  return {
    totalCapsules: data?.length,
    maxStreak: maxStreakRange?.length ?? 0,
    formattedRange,
  };
}
