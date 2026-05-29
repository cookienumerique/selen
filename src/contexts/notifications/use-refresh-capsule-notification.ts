import { useEffect } from 'react';
import { AppState } from 'react-native';
import { messages } from './notification-message.json';
import { useNotificationCapsule } from './use-notification-capsule';

const randomMessage = () =>
  messages[Math.floor(Math.random() * messages.length)];

export const useRefreshCapsuleNotification = () => {
  const { subscribe, isSubscribed, isLoaded, time } = useNotificationCapsule();

  useEffect(() => {
    if (!isLoaded || !isSubscribed) return;

    const refresh = () => subscribe({ ...randomMessage(), ...time });

    refresh();

    const subscription = AppState.addEventListener('change', (state) => {
      if (state === 'active') refresh();
    });

    return () => subscription.remove();
  }, [isLoaded, isSubscribed]);
};
