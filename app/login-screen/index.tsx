import { Container } from '@/src/components/layout/container';
import { Text } from '@/src/components/texts';
import { Colors } from '@/src/constants/theme';
import { useUser } from '@/src/contexts/use-user';
import { LoginButton } from '@/src/features/login/login-button';
import { router } from 'expo-router';
import React, { useEffect } from 'react';
import { ActivityIndicator, Image, View } from 'react-native';

export default function Home() {
  const { user, isLoadingUser } = useUser();

  useEffect(() => {
    if (user) {
      router.push('/(tabs)/home');
    }
  }, [user]);

  return (
    <Container style={{ backgroundColor: Colors.slateRoot }}>
      <View
        style={{
          height: '100%',
          alignItems: 'center',
        }}
      >
        <Image
          style={{ width: 300, height: 300 }}
          source={require('@/assets/images/icon_selen_512.png')}
        />
        <View style={{ gap: 64 }}>
          <Text
            style={{
              color: Colors.warmSand,
              fontSize: 24,
              textAlign: 'center',
              lineHeight: 40,
            }}
          >
            Une capsule par jour {`\n`}pour comprendre {`\n`} ton monde
            intérieur
          </Text>
          {isLoadingUser && (
            <ActivityIndicator size="large" color={Colors.warmSand} />
          )}
          <View style={{ width: '100%', marginTop: 'auto' }}></View>
        </View>

        {!user && (
          <View style={{ width: '100%', marginTop: 'auto' }}>
            <LoginButton />
          </View>
        )}
      </View>
    </Container>
  );
}
