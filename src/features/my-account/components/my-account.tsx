import { Container } from '@/src/components/layout/container';
import { Header } from '@/src/components/layout/header';
import { MoonBackground } from '@/src/components/layout/moon-background';
import { useUser } from '@/src/contexts/use-user';
import { UserAvatarName } from '@/src/features/auth/components/user-avatar-name';
import { DeleteAccountButtonAlert } from '@/src/features/my-account/components/delete-account-button-alert';
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
        <View style={{ gap: 32 }}>
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
              value={user?.name ?? 'Non renseigné'}
              icon={<Ionicons name="people" size={20} color="darkgray" />}
            />
            <UserItem
              label="Prénom"
              value={user?.firstName ?? 'Non renseigné'}
              icon={<Ionicons name="people" size={20} color="darkgray" />}
            />
            <UserItem
              label="Email"
              value={user?.email ?? ''}
              icon={<Foundation name="mail" size={20} color="darkgray" />}
            />
          </View>
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <DeleteAccountButtonAlert />
          </View>
        </View>
      </View>
    </Container>
  );
};
