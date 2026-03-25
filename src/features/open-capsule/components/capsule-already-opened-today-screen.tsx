import CapsuleAlreadyRespondedToday from '@/app/capsule/capsule-already-responded-today';
import { Container } from '@/src/components/layout/container';
import { Header } from '@/src/components/layout/header';
import { router } from 'expo-router';
import React from 'react';
import { KeyboardAvoidingView, View } from 'react-native';

export const CapsuleAlreadyOpenedTodayScreen = () => {
  return (
    <Container>
      <View style={{ gap: 16 }}>
        <Header title="Capsule du jour" onPress={() => router.push('/(tabs)/home')} />
      </View>
      <KeyboardAvoidingView behavior="padding" style={{ flex: 1, padding: 16 }}>
        <CapsuleAlreadyRespondedToday />
      </KeyboardAvoidingView>
    </Container>
  );
};
