import dayjs from 'dayjs';

type FormatStreakRangeProps = {
  start: string | undefined;
  end: string | undefined;
};

export const formatStreakRange = (range: FormatStreakRangeProps) => {
  if (!range?.start) {
    return '-';
  }

  const referenceDay = dayjs(range.start);

  const weekStart = referenceDay.startOf('week');
  const weekEnd = referenceDay.endOf('week');

  // même mois
  if (weekStart.month() === weekEnd.month()) {
    return `${weekStart.format('DD')}-${weekEnd.format('DD MMM')}`;
  }

  // mois différents
  return `${weekStart.format('DD MMM')}-${weekEnd.format('DD MMM')}`;
};
