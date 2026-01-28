import { formatStreakRange } from '@/src/features/calendar/utils/format-streak-range';
import { getMaxStreakRangeForMonth } from '@/src/features/calendar/utils/get-max-streak-for-month';
import { CapsuleResponse } from '@/types/capsule-response';
import dayjs from 'dayjs';

export type UseCalendarStatsReturn = {
  totalCapsules: number;
  maxStreak: number;
  formattedRange: string | undefined;
};
export function useCalendarStats(
  data: CapsuleResponse[] | undefined,
  period: string,
) {
  const totalCapsules =
    data?.filter(
      (item) => dayjs(item.createdAt).format('YYYY-MM') === period,
    ) ?? [];

  const maxStreakRange = getMaxStreakRangeForMonth(data, period);
  const formattedRange = maxStreakRange
    ? formatStreakRange(maxStreakRange)
    : undefined;

  return {
    totalCapsules: totalCapsules.length,
    maxStreak: maxStreakRange?.length ?? 0,
    formattedRange,
  };
}
