import { HomeView } from '@/src/features/home/components/home-view';
import { InnerWeatherModal } from '@/src/features/inner-weather/components/inner-weather-modal';
import { useNotificationCapsule } from '@/src/features/notification/hooks/use-notification-capsule';

export default function HomeScreen() {
  useNotificationCapsule();
  return (
    <>
      <HomeView />
      <InnerWeatherModal />
    </>
  );
}
