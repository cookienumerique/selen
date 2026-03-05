import { clearPendingPurchases } from '@/src/features/subscription/hooks/clear-pending-purchases';
import { useEffect } from 'react';
import { initConnection } from 'react-native-iap';
export const useIapInit = (): void => {
  useEffect(() => {
    const init = async () => {
      try {
        await initConnection();
        await clearPendingPurchases();
        console.log('IAP connection initialized');
      } catch (error) {
        console.warn('IAP init error:', error);
      }
    };

    init();
  }, []);
};
