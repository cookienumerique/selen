import { CapsulesProvider } from '@/src/contexts/use-capsules';
import OpenCapsuleView from '@/src/features/open-capsule/components/open-capsule-view';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';

export default function OpenCapsule() {
  const { id } = useLocalSearchParams<{ id: string }>()
  return <CapsulesProvider id={id}>
    <OpenCapsuleView />
  </CapsulesProvider>;
}
