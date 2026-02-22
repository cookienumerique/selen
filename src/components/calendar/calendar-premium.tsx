import { useSubscriptions } from '@/src/contexts/use-subscriptions';
import { useCalendar } from '@/src/features/calendar/hooks/calendar-provider';
import { PremiumCard } from '@/src/features/premium/premium-card';
import dayjs from 'dayjs';
import { StyleSheet, View } from 'react-native';
export const CalendarPremium = () => {
  const { hasActiveSubscription } = useSubscriptions();

  const { period } = useCalendar();

  const isSameMonth = period === dayjs().format('YYYY-MM');
  const displayPremiumOverlay = !hasActiveSubscription && !isSameMonth;

  return (
    <>
      {displayPremiumOverlay && (
        <View
          style={[
            StyleSheet.absoluteFill,
            {
              marginTop: 50,
              zIndex: 10,
              backgroundColor: 'rgba(255, 255, 255, 0.50)',
              justifyContent: 'center',
              alignItems: 'center',
              padding: 20,
            },
          ]}
        >
          <PremiumCard
            title="Ne laisse pas le fil s'interrompre"
            description="Accéde à tout ton historique et garde une trace précieuse de tes victoires."
          />
        </View>
      )}
    </>
  );
};
