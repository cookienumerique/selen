import { useEffect } from 'react';
import { AppState, AppStateStatus } from 'react-native';

export const useOnAppForeground = (onForeground: () => void) => {
  useEffect(() => {
    const handleAppStateChange = (nextState: AppStateStatus) => {
      if (nextState === 'active') {
        onForeground();
      }
    };

    const subscription = AppState.addEventListener(
      'change',
      handleAppStateChange,
    );

    return () => subscription.remove();
  }, [onForeground]);
};
