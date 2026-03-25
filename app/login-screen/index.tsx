import { Container } from '@/src/components/layout/container';
import { Text } from '@/src/components/texts';
import { Colors } from '@/src/constants/theme';
import { useUser } from '@/src/contexts/use-user';
import { SignInAppleButton } from '@/src/features/login/signin-apple-button';
import { SignInGoogleButton } from '@/src/features/login/signin-google-button';
import { router } from 'expo-router';
import React, { useEffect } from 'react';
import { ActivityIndicator, Image, Platform, View } from 'react-native';

export default function Home() {
  const { user, isLoadingUser } = useUser();

  useEffect(() => {
    if (user) {
      router.push('/(tabs)/home');
    }
  }, [user]);

  return (
    <Container style={{ backgroundColor: Colors.slateRoot, padding: 16 }}>
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
          <View style={{ width: '100%', marginTop: 'auto', gap: 16 }}>
            <SignInGoogleButton />
            {Platform.OS === 'ios' && <SignInAppleButton />}
          </View>
        )}
      </View>
    </Container>
  );
}
