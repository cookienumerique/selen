import { Button } from '@/src/components/button';
import { Container } from '@/src/components/layout/container';
import { Header } from '@/src/components/layout/header';
import { MoonBackground } from '@/src/components/layout/moon-background';
import { Text } from '@/src/components/texts';
import { Colors } from '@/src/constants/theme';
import { useNotificationPermission } from '@/src/features/notification/hooks/use-notification-permission';
import { openNotificationSettings } from '@/src/features/notification/utils/open-notification-settings';
import { useOnAppForeground } from '@/src/hooks/use-on-app-foreground';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { View } from 'react-native';
export default function NotificationScreen() {
  const { isGranted, checkPermission } = useNotificationPermission();

  useOnAppForeground(checkPermission);

  const handleOpenNotificationSettings = () => {
    openNotificationSettings();
  };

  return (
    <Container>
      <MoonBackground />
      <Header onGoBack={() => router.push('/(tabs)/settings')} />

      <View
        style={{
          flex: 1,
          gap: 32,
          justifyContent: 'center',
          paddingHorizontal: 16,
        }}
      >
        <Text
          style={{
            color: Colors.oakHoneyDark,
            fontSize: 32,
            fontWeight: 'bold',
            textAlign: 'center',
            lineHeight: 48,
            letterSpacing: 1,
          }}
        >
          {isGranted ? 'Notifications activées' : 'Notifications désactivées'}
        </Text>
        <Text
          style={{
            fontSize: 18,
            color: Colors.slateRoot,
            fontWeight: 'bold',
            textAlign: 'center',
          }}
        >
          {isGranted
            ? "Chaque matin à 7h45, Selen t'enverra un rappel doux pour t'inviter à ouvrir ta capsule du jour.\n\nUn petit moment pour toi, avant que la journée ne s\'emballe."
            : "Chaque matin à 7h45, Selen vous invite à ouvrir votre capsule avant que la journée ne s'emballe."}
        </Text>
      </View>
      <View>
        <Button onPress={handleOpenNotificationSettings}>
          <Ionicons
            name={isGranted ? 'notifications-off' : 'notifications'}
            size={20}
            color="white"
          />
          <Text style={{ color: 'white' }}>
            {isGranted ? 'Désactiver' : 'Activer'} les notifications
          </Text>
        </Button>
      </View>
    </Container>
  );
}
