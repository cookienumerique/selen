import { useNotificationCapsule } from '@/src/contexts/notifications/use-notification-capsule';
import { HomeView } from '@/src/features/home/components/home-view';
import { InnerWeatherModal } from '@/src/features/inner-weather/components/inner-weather-modal';
import { useEffect } from 'react';

export default function HomeScreen() {
  const { initSubscription } = useNotificationCapsule();

  useEffect(() => {
    initSubscription();
  }, []);

  return (
    <>
      <HomeView />
      <InnerWeatherModal />
    </>
  );
}
