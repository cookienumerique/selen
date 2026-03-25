import { Card } from '@/src/components/card';
import { Container } from '@/src/components/layout/container';
import { Header } from '@/src/components/layout/header';
import { Text } from '@/src/components/texts';
import { env } from '@/src/config/env';
import { useUser } from '@/src/contexts/use-user';
import { UserAvatarName } from '@/src/features/auth/components/user-avatar-name';
import { LogoutButton } from '@/src/features/settings/components/logout-button';
import { SettingsItem } from '@/src/features/settings/components/settings-item';
import { useSettingsItems } from '@/src/features/settings/hooks/use-settings-items';
import React from 'react';
import { Platform, View } from 'react-native';

export default function SettingsView() {
  const { user } = useUser();

  const SETTINGS_ITEMS = useSettingsItems();
  return (
    <Container>
      <Header title="Paramètres" />
      <View style={{ flex: 1, padding: 16 }}>
        <View style={{ gap: 16, flex: 1 }}>
          <UserAvatarName />
          <Card style={{ gap: 24 }}>
            <>
              {SETTINGS_ITEMS.map((item) => (
                <SettingsItem key={item.route} {...item} />
              ))}
            </>
          </Card>
        </View>
        {user && <LogoutButton />}
        <Text
          style={{
            color: 'gray',
            textAlign: 'center',
            fontSize: 12,
          }}
        >
          v{env.VERSION} (
          {Platform.OS === 'android' ? env.BUILD_ANDROID : env.BUILD_IOS})
        </Text>
      </View>
    </Container>
  );
}
