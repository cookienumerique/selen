import {
  Calendar as CalendarComponent,
  CalendarProps,
} from 'react-native-calendars';

export const Calendar = (props: CalendarProps) => {
  return (
    <CalendarComponent
      style={{
        paddingVertical: 8,
        borderRadius: 10,
      }}
      markingType="dot"
      theme={{
        dotStyle: {
          width: 8,
          height: 8,
          borderRadius: 4,
          marginTop: 2,
        },
      }}
      {...props}
    />
  );
};
