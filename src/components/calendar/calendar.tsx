import '@/src/components/calendar/calendar-locale';
import { Card } from '@/src/components/card';
import {
  Calendar as CalendarComponent,
  CalendarProps,
} from 'react-native-calendars';

export const Calendar = (props: CalendarProps) => {
  return (
    <Card
      style={{
        padding: 8,
        paddingBottom: 24,
      }}
    >
      <CalendarComponent
        firstDay={1}
        markingType="multi-dot"
        theme={{
          dotStyle: {
            width: 8,
            height: 8,
            borderRadius: 4,
          },
        }}
        {...props}
      />
    </Card>
  );
};
