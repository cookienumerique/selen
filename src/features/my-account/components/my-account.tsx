import { Container } from '@/src/components/layout/container';
import { Header } from '@/src/components/layout/header';
import { MoonBackground } from '@/src/components/layout/moon-background';
import { useUser } from '@/src/contexts/use-user';
import { UserAvatarName } from '@/src/features/auth/components/user-avatar-name';
import { UserItem } from '@/src/features/my-account/components/user-item';
import { Foundation, Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { View } from 'react-native';

export const MyAccountScreen = () => {
  const { user } = useUser();
  return (
    <Container>
      <MoonBackground />
      <View style={{ gap: 16, flex: 1 }}>
        <Header onGoBack={() => router.push('/(tabs)/settings')} />
        <UserAvatarName />
        <View
          style={{
            backgroundColor: 'white',
            padding: 16,
            borderRadius: 16,
            gap: 24,
          }}
        >
          <UserItem
            label="Nom"
            value={user?.name ?? ''}
            icon={<Ionicons name="people" size={20} color="darkgray" />}
          />
          <UserItem
            label="Email"
            value={user?.email ?? ''}
            icon={<Foundation name="mail" size={20} color="darkgray" />}
          />
        </View>
      </View>
    </Container>
  );
};
