import NoCapsuleAvailable from '@/app/capsule/no-capsule-available';
import { Container } from '@/src/components/layout/container';
import { Header } from '@/src/components/layout/header';
import { MoonBackground } from '@/src/components/layout/moon-background';
import React from 'react';
import { KeyboardAvoidingView, View } from 'react-native';

export const NoCapsuleAvailableScreen = () => {
  return (
    <Container>
      <MoonBackground />
      <View style={{ gap: 16 }}>
        <Header title="Capsule du jour" />
      </View>
      <KeyboardAvoidingView behavior="padding" style={{ flex: 1, padding: 16 }}>
        <NoCapsuleAvailable />
      </KeyboardAvoidingView>
    </Container>
  );
};
