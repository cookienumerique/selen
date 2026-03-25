import { Button } from '@/src/components/button';
import { Container } from '@/src/components/layout/container';
import { Header } from '@/src/components/layout/header';
import { Text } from '@/src/components/texts';
import { Colors } from '@/src/constants/theme';
import { messages } from '@/src/contexts/notifications/notification-message.json';
import { useNotificationCapsule } from '@/src/contexts/notifications/use-notification-capsule';
import { useNotificationPermission } from '@/src/features/notification/hooks/use-notification-permission';
import { openNotificationSettings } from '@/src/features/notification/utils/open-notification-settings';
import { NotificationTimePickerCard } from '@/src/features/settings/components/notification-time-picker-card';
import { NotificationToggleCard } from '@/src/features/settings/components/notification-toggle-card';
import { NotificationFormValues, useNotificationForm } from '@/src/features/settings/hooks/use-notification-form';
import { useOnAppForeground } from '@/src/hooks/use-on-app-foreground';
import { router } from 'expo-router';
import React from 'react';
import { Keyboard, TouchableWithoutFeedback, View } from 'react-native';
export default function NotificationScreen() {
  const { isGranted, checkPermission } = useNotificationPermission();
  useOnAppForeground(checkPermission);

  const { subscribe, unsubscribe, isSubscribed, time } = useNotificationCapsule()
  const form = useNotificationForm({ time, isSubscribed });
  const handleSubmit = (data: NotificationFormValues): void => {
    const { hours, minutes, isSubscribed } = data;

    if (!isSubscribed) {
      unsubscribe();
    } else {
      const message = messages[Math.floor(Math.random() * messages.length)];
      subscribe({ title: message.title, body: message.body, hours: Number(hours), minutes: Number(minutes) });
    }
    router.push('/(tabs)/home');
    return
  }

  const handleOpenNotificationSettings = () => openNotificationSettings()

  return (
    <Container>
      <Header title="Notifications" onPress={() => router.push('/(tabs)/settings')} />

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flex: 1, padding: 16, gap: 16 }}>
          {!isGranted && (
            <>
              <Text style={{ fontSize: 14, color: Colors.slateRoot, textAlign: 'center', marginTop: 8, lineHeight: 22 }}>
                Les notifications dans le téléphone sont désactivées.
              </Text>
              <Text style={{ fontSize: 14, color: Colors.slateRoot, textAlign: 'center', marginTop: 8, lineHeight: 22 }}>
                Pour les activer, veuillez les autoriser dans les paramètres du téléphone.
              </Text>
              <Button onPress={handleOpenNotificationSettings} style={{ marginTop: 'auto' }}>
                <Text style={{ color: 'white' }}>Activer les notifications</Text>
              </Button>
            </>
          )}
          {isGranted && (
            <>
              <NotificationToggleCard control={form.control} />
              <NotificationTimePickerCard control={form.control} />

              <Text style={{ fontSize: 14, color: Colors.slateRoot, textAlign: 'center', marginTop: 8, lineHeight: 22 }}>
                {isSubscribed
                  ? `Chaque jour, Selen t'enverra un rappel pour t'inviter à ouvrir ta capsule du jour.`
                  : "Active les notifications pour recevoir un rappel doux chaque matin avant que la journée ne s'emballe."}
              </Text>
              <Button onPress={form.handleSubmit(handleSubmit)} style={{ marginTop: 'auto' }}>
                <Text style={{ color: 'white' }}>Enregistrer</Text>
              </Button>
            </>
          )}
        </View>
      </TouchableWithoutFeedback>
    </Container >
  );
}