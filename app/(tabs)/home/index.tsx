import { HomeView } from '@/src/features/home/components/home-view';
import { InnerWeatherModal } from '@/src/features/inner-weather/components/inner-weather-modal';

export default function HomeScreen() {
  return (
    <>
      <HomeView />
      <InnerWeatherModal />
    </>
  );
}
