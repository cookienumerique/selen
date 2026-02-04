import { MarkingProps } from 'react-native-calendars/src/calendar/day/marking';

export type MarkedDates = Record<string, MarkingProps>;

export function mergeMarkedDates(
  markedCapsulesDates: MarkedDates,
  markedInnerWeathersDates: MarkedDates,
): MarkedDates {
  const result: MarkedDates = {};

  for (const source of [markedCapsulesDates, markedInnerWeathersDates]) {
    if (!source) continue;

    Object.entries(source).forEach(([date, marking]) => {
      if (!result[date]) {
        result[date] = {
          marked: true,
          dots: marking.dots ? [...marking.dots] : [],
        };
        return;
      }

      result[date].dots = [
        ...(result[date].dots ?? []),
        ...(marking.dots ?? []),
      ];
    });
  }

  return result;
}
