import { Calendar } from '@/src/components/calendar/calendar';
import { Container } from '@/src/components/layout/container';
import { Header } from '@/src/components/layout/header';
import { Encouragement } from '@/src/features/calendar/components/encouragement';
import { LegendList } from '@/src/features/calendar/components/legends/legend-list';
import { StatsRow } from '@/src/features/calendar/components/stats-row';
import { useCalendar } from '@/src/features/calendar/hooks/calendar-provider';
import { ScrollView } from 'react-native';

export function CalendarView() {
  const {
    isLoadingCapsules,
    isLoadingWeather,
    markedDates,
    stats,
    onDayPress,
    onMonthChange,
  } = useCalendar();
  return (
    <Container>
      <Header title="Mon mois intérieur" />

      <ScrollView
        contentContainerStyle={{
          padding: 16,
          gap: 24,
        }}
      >

        <StatsRow stats={stats} isLoading={isLoadingCapsules} />

        <Calendar
          onMonthChange={onMonthChange}
          markedDates={markedDates}
          displayLoadingIndicator={isLoadingCapsules || isLoadingWeather}
          onDayPress={onDayPress}
        />

        <LegendList />

        <Encouragement />
      </ScrollView>
    </Container>
  );
}
