import * as Notifications from 'expo-notifications';
import { SchedulableTriggerInputTypes } from 'expo-notifications/src/Notifications.types';

export const subscribeCapsuleNotification = async () => {
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
};
