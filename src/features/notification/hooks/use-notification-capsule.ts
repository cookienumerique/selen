import { useNotificationPermission } from '@/src/features/notification/hooks/use-notification-permission';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import { SchedulableTriggerInputTypes } from 'expo-notifications/src/Notifications.types';
import { useEffect, useRef } from 'react';

const CAPSULE_NOTIFICATION_KEY = 'capsule_notification_subscribed';

export const useNotificationCapsule = () => {
  const isSettingUpRef = useRef(false);

  const { isGranted, canAskAgain, requestPermission } =
    useNotificationPermission();

  const subscribeCapsuleNotification = async () => {
    await Notifications.cancelAllScheduledNotificationsAsync();
    await AsyncStorage.setItem(CAPSULE_NOTIFICATION_KEY, 'true');
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Ton sas de clarté t'attend... 🧭 ",
        body: 'Avant que la journée ne s\'emballe, prends 3 minutes pour découvrir ta capsule du jour. Ton futur "toi" de 18h te remerciera',
      },
      trigger: {
        type: SchedulableTriggerInputTypes.DAILY,
        hour: 7,
        minute: 45,
      },
    });
    console.info('User subscribed to capsule notification');
  };

  useEffect(() => {
    const setupCapsuleNotification = async () => {
      if (isSettingUpRef.current) return;
      isSettingUpRef.current = true;

      try {
        const alreadySubscribed = await AsyncStorage.getItem(
          CAPSULE_NOTIFICATION_KEY,
        );
        if (alreadySubscribed === 'true') return;
        if (isGranted) {
          await subscribeCapsuleNotification();
          return;
        }

        if (!isGranted && canAskAgain) {
          const granted = await requestPermission();
          if (granted) {
            await subscribeCapsuleNotification();
          }
        }
      } finally {
        isSettingUpRef.current = false;
      }
    };

    setupCapsuleNotification();
  }, [isGranted, canAskAgain, requestPermission]);
};
