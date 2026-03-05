// hooks/usePowerShakeSensor.ts

import { useBreakSound } from '@/src/features/power-shake/use-breath-sound';
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
  const { play: playBreathSound } = useBreakSound();
  useEffect(() => {
    if (!enabled) return;

    Accelerometer.setUpdateInterval(100);

    const subscription = Accelerometer.addListener(({ x, y, z }) => {
      const force = Math.sqrt(x * x + y * y + z * z);

      const threshold = 1.7;
      const cooldown = 1500;

      if (force > threshold) {
        const now = Date.now();

        if (now - lastTrigger.current > cooldown) {
          lastTrigger.current = now;

          playBreathSound();
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
          onShake();
        }
      }
    });

    return () => subscription.remove();
  }, [enabled, onShake, playBreathSound]);
}
