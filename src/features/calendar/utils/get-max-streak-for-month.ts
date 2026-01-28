import dayjs from 'dayjs';

type CapsuleResponse = {
  createdAt: string;
};

type StreakRange = {
  start: string; // YYYY-MM-DD
  end: string; // YYYY-MM-DD
  length: number;
};

export function getMaxStreakRangeForMonth(
  capsules: CapsuleResponse[] = [],
  month: string, // YYYY-MM
): StreakRange | null {
  // 1️⃣ jours uniques du mois
  const days = Array.from(
    new Set(
      capsules
        .filter((item) => dayjs(item.createdAt).format('YYYY-MM') === month)
        .map((item) => dayjs(item.createdAt).format('YYYY-MM-DD')),
    ),
  ).sort();

  if (days.length === 0) return { length: 0, start: '', end: '' };

  let maxRange: StreakRange = {
    start: days[0],
    end: days[0],
    length: 1,
  };

  let currentStart = days[0];
  let currentLength = 1;

  for (let i = 1; i < days.length; i++) {
    const prev = dayjs(days[i - 1]);
    const current = dayjs(days[i]);

    if (current.diff(prev, 'day') === 1) {
      currentLength++;
    } else {
      currentStart = days[i];
      currentLength = 1;
    }

    if (currentLength > maxRange.length) {
      maxRange = {
        start: currentStart,
        end: days[i],
        length: currentLength,
      };
    }
  }

  return maxRange;
}
