import '@/src/components/calendar/calendar-locale';
import { CalendarPremium } from '@/src/components/calendar/calendar-premium';
import { Card } from '@/src/components/card';
import React from 'react';
import { View } from 'react-native';
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
        overflow: 'hidden',
      }}
    >
      <View style={{ position: 'relative' }}>
        <View>
          <CalendarComponent
            firstDay={1}
            markingType="multi-dot"
            theme={{
              dotStyle: { width: 8, height: 8, borderRadius: 4 },
              calendarBackground: 'transparent',
            }}
            {...props}
          />
        </View>
        <CalendarPremium />
      </View>
    </Card>
  );
};
