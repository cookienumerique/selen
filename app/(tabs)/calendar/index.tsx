import { CalendarView } from '@/src/features/calendar/components/calendar-view';
import { CalendarProvider } from '@/src/features/calendar/hooks/calendar-provider';
import React from 'react';

export default function Calendar() {
  return (
    <CalendarProvider>
      <CalendarView />
    </CalendarProvider>
  );
}
