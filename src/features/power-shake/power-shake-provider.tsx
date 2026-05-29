import { usePowerShakeSensor } from '@/src/features/power-shake/hooks/use-power-shake-sensor';
import { useSound } from '@/src/hooks/use-sound';
import React, { useState } from 'react';
import PowerShakeModal from './power-shake-modal';

type PowerShakeProviderProps = {
  children: React.ReactNode;
};

export const PowerShakeProvider = ({ children }: PowerShakeProviderProps) => {
  const { play: playBreathSound, stop: stopBreathSound } = useSound(
    require('@/assets/sounds/breath-sound.wav'),
  );
  const [isVisiblePowerShakeModal, setIsVisiblePowerShakeModal] =
    useState(false);

  usePowerShakeSensor({
    enabled: !isVisiblePowerShakeModal,
    onShake: () => {
      setIsVisiblePowerShakeModal(true);
      playBreathSound();
    },
  });

  return (
    <>
      {children}
      <PowerShakeModal
        visible={isVisiblePowerShakeModal}
        onClose={() => setIsVisiblePowerShakeModal(false)}
        stopBreathSound={stopBreathSound}
      />
    </>
  );
};
