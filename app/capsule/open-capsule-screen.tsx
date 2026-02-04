import { CapsulesProvider } from '@/src/contexts/use-capsules';
import OpenCapsuleView from '@/src/features/open-capsule/components/open-capsule-view';
import { useFocusEffect, useLocalSearchParams } from 'expo-router';
import React, { useCallback } from 'react';
import { BackHandler } from 'react-native';

export default function OpenCapsule() {
  const { id } = useLocalSearchParams<{ id: string }>();

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => true;
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        onBackPress,
      );

      return () => backHandler.remove();
    }, []),
  );
  return (
    <CapsulesProvider id={id}>
      <OpenCapsuleView />
    </CapsulesProvider>
  );
}
