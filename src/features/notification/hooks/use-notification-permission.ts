import * as Notifications from 'expo-notifications';
import { useCallback, useEffect, useState } from 'react';

export type NotificationPermissionStatus =
  | 'undetermined'
  | 'granted'
  | 'denied';

export const useNotificationPermission = () => {
  const [status, setStatus] =
    useState<NotificationPermissionStatus>('undetermined');
  const [canAskAgain, setCanAskAgain] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const checkPermission = useCallback(async () => {
    const settings = await Notifications.getPermissionsAsync();

    setStatus(settings.granted ? 'granted' : 'denied');
    setCanAskAgain(settings.canAskAgain ?? true);
    setIsLoading(false);
  }, []);

  const requestPermission =
    useCallback(async (): Promise<NotificationPermissionStatus> => {
      const settings = await Notifications.requestPermissionsAsync();
      const status = settings.granted ? 'granted' : 'denied';
      setStatus(status);
      setCanAskAgain(settings.canAskAgain ?? false);
      console.info('Request permission for notifications status: ', status);
      return status;
    }, []);

  useEffect(() => {
    checkPermission();
  }, [checkPermission]);

  return {
    status,
    isGranted: status === 'granted',
    isDenied: status === 'denied',
    canAskAgain,
    isLoading,
    checkPermission,
    requestPermission,
  };
};
