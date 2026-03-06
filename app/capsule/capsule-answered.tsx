import CapsuleAnsweredScreen from '@/src/features/capsule-answered/components/capsule-answered-screen';
import { useSound } from '@/src/hooks/use-sound';
import React, { useEffect } from 'react';

export default function CapsuleAnswered() {
  const { play, isReady } = useSound(require('@/assets/sounds/close-capsule.wav'));
  useEffect(() => {
    if (isReady) {
      play();
    }
  }, [isReady, play]);
  return <CapsuleAnsweredScreen />;
}
