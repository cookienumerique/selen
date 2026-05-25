import { useNeedsConsent } from '@/src/features/consent/hooks/use-needs-consent';
import { User } from '@/src/features/user/types/user.types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

export const DISCOVER_KEY = 'discover_power_shake';

export function useDiscoverPowerShake(user: User | null) {
  const [visible, setVisible] = useState(false);
  const needsConsent = useNeedsConsent();

  useEffect(() => {
    if (!user || needsConsent) return;

    const check = async () => {
      const alreadySeen = await AsyncStorage.getItem(DISCOVER_KEY);
      if (!alreadySeen) setVisible(true);
    };

    check();
  }, [user, needsConsent]);

  const close = async () => {
    await AsyncStorage.setItem(DISCOVER_KEY, 'true');
    setVisible(false);
  };

  return { visible, close };
}
