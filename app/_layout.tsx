import { toastConfig } from '@/src/components/toast/selen-toast';
import { UserProvider } from '@/src/contexts/use-user';
import { configureGoogleSignIn } from '@/src/features/auth/config/google-signin';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import dayjs from 'dayjs';
import 'dayjs/locale/fr';
import { useFonts } from 'expo-font';
import * as Notifications from 'expo-notifications';
import { Slot } from 'expo-router';
import React, { useEffect } from 'react';
import Toast from 'react-native-toast-message';

dayjs.locale('fr');

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true, // legacy (Android / compat)
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
  });

  useEffect(() => {
    configureGoogleSignIn();
  }, []);
  if (!loaded) return null;

  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <Slot />
        <Toast config={toastConfig} bottomOffset={200} />
      </UserProvider>
    </QueryClientProvider>
  );
}
