import ForceUpdateScreen from '@/app/force-update';
import { toastConfig } from '@/src/components/toast/selen-toast';
import { NotificationCapsuleProvider } from '@/src/contexts/notifications/use-notification-capsule';
import { SubscriptionsProvider } from '@/src/contexts/use-subscriptions';
import { UserProvider } from '@/src/contexts/use-user';
import { configureGoogleSignIn } from '@/src/features/auth/config/google-signin';
import { useAppUpdate } from '@/src/features/force-update/hooks/use-app-update';
import { PowerShakeProvider } from '@/src/features/power-shake/power-shake-provider';
import { useIapInit } from '@/src/features/subscription/hooks/use-iap-init';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import dayjs from 'dayjs';
import 'dayjs/locale/fr';
import { useFonts } from 'expo-font';
import * as Notifications from 'expo-notifications';
import { Slot, SplashScreen } from 'expo-router';
import React, { useEffect } from 'react';
import Toast from 'react-native-toast-message';

dayjs.locale('fr');

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true, // iOS foreground banner
    shouldShowList: true, // iOS notification center
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 1000 * 60,
    },
  },
});

export default function RootLayout() {
  const [loaded] = useFonts({
    'OpenSans-Regular': require('../assets/fonts/OpenSans-Regular.ttf'),
    'OpenSans-Bold': require('../assets/fonts/OpenSans-Bold.ttf'),
    'OpenSans-Italic': require('../assets/fonts/OpenSans-Italic.ttf'),
    'OpenSans-Light': require('../assets/fonts/OpenSans-Light.ttf'),
    'OpenSans-BoldItalic': require('../assets/fonts/OpenSans-Bold.ttf'),
    'OpenSans-LightItalic': require('../assets/fonts/OpenSans-Light.ttf'),
    'TheSeasonsRegular': require('../assets/fonts/the-seasons-regular.ttf'),
    'TheSeasonsItalic': require('../assets/fonts/the-seasons-italic.ttf'),
    'TheSeasonsBold': require('../assets/fonts/the-seasons-bold.ttf'),
    'TheSeasonsLight': require('../assets/fonts/the-seasons-light.ttf'),
    'TheSeasonsLightItalic': require('../assets/fonts/the-seasons-light-italic.ttf'),
    'TheSeasonsBoldItalic': require('../assets/fonts/the-seasons-bold-italic.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  const { needsUpdate } = useAppUpdate();
  useIapInit();

  useEffect(() => {
    configureGoogleSignIn();
  }, []);
  if (!loaded) return null;

  if (needsUpdate) {
    return <ForceUpdateScreen />;
  }
  if (!loaded) return null;

  return (
    <NotificationCapsuleProvider>
      <QueryClientProvider client={queryClient}>
        <SubscriptionsProvider>
          <UserProvider>
            <PowerShakeProvider>
              <Slot />
              <Toast config={toastConfig} bottomOffset={200} />
            </PowerShakeProvider>
          </UserProvider>
        </SubscriptionsProvider>
      </QueryClientProvider>
    </NotificationCapsuleProvider>
  );
}
