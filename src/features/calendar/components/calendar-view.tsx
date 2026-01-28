import { Calendar } from '@/src/components/calendar/calendar';
import { Container } from '@/src/components/layout/container';
import { Header } from '@/src/components/layout/header';
import { MoonBackground } from '@/src/components/layout/moon-background';
import { Text } from '@/src/components/texts';
import { Colors } from '@/src/constants/theme';
import { Encouragement } from '@/src/features/calendar/components/encouragement';
import { Legend } from '@/src/features/calendar/components/legend';
import { StatsRow } from '@/src/features/calendar/components/stats-row';
import { useCalendarScreen } from '@/src/features/calendar/hooks/use-calendar-screen';
import { ScrollView } from 'react-native';

export function CalendarView() {
  const { isLoading, markedDates, stats, onDayPress, onMonthChange } =
    useCalendarScreen();

  return (
    <Container>
      <MoonBackground />
      <Header />

      <ScrollView contentContainerStyle={{ paddingVertical: 24, gap: 24 }}>
        <Text
          style={{ fontSize: 24, fontWeight: 'bold', color: Colors.slateRoot }}
        >
          Mon mois intérieur
        </Text>

        <StatsRow stats={stats} isLoading={isLoading} />

        <Calendar
          onMonthChange={onMonthChange}
          markedDates={markedDates}
          displayLoadingIndicator={isLoading}
          onDayPress={onDayPress}
        />

        <Legend />

        <Encouragement />
      </ScrollView>
    </Container>
  );
}
