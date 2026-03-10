import * as Haptics from 'expo-haptics';
import { Accelerometer } from 'expo-sensors';
import { useEffect, useRef } from 'react';

type UsePowerShakeSensorProps = {
  enabled: boolean;
  onShake: () => void;
};

export function usePowerShakeSensor({
  enabled,
  onShake,
}: UsePowerShakeSensorProps) {
  const lastTrigger = useRef(0);
  useEffect(() => {
    if (!enabled) return;

    Accelerometer.setUpdateInterval(100);

    const subscription = Accelerometer.addListener(({ x, y, z }) => {
      const force = Math.sqrt(x * x + y * y + z * z);

      const threshold = 2.8;
      const cooldown = 2000;

      if (force > threshold) {
        const now = Date.now();

        if (now - lastTrigger.current > cooldown) {
          lastTrigger.current = now;

          onShake();
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
        }
      }
    });

    return () => subscription.remove();
  }, [enabled, onShake]);
}
