import { Card } from '@/src/components/card';
import { Container } from '@/src/components/layout/container';
import { Header } from '@/src/components/layout/header';
import { MoonBackground } from '@/src/components/layout/moon-background';
import { Text } from '@/src/components/texts';
import { Colors } from '@/src/constants/theme';
import { useFetchCapsulesResponseById } from '@/src/features/capsule-reponse/hooks/use-fetch-capsules-response-by-id';
import dayjs from 'dayjs';
import { Image } from 'expo-image';
import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { ActivityIndicator, View } from 'react-native';

export const CapsuleResponseDetailScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: capsuleResponse, isLoading } = useFetchCapsulesResponseById(
    Number(id),
  );

  const response =
    capsuleResponse?.response === '' || capsuleResponse?.response === null
      ? "Vous n'avez pas répondu à la capsule"
      : `${capsuleResponse?.response}`;
  return (
    <Container>
      <MoonBackground />
      <Header onGoBack={() => router.push('/(tabs)/calendar')} />

      <View style={{ flex: 1, paddingVertical: 32 }}>
        {isLoading && <ActivityIndicator />}
        {capsuleResponse && (
          <View style={{ flex: 1, gap: 32 }}>
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Image
                source={require('@/assets/images/capsule.png')}
                style={{
                  width: 250,
                  height: 100,
                  resizeMode: 'contain',
                }}
              />
            </View>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
                color: Colors.slateRoot,
                textAlign: 'center',
              }}
            >
              Capsule du{' '}
              {dayjs(capsuleResponse.createdAt).format(
                'dddd D MMMM YYYY, à HH:mm',
              )}
            </Text>
            <Card style={{ gap: 36, paddingHorizontal: 24 }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 'bold',
                  color: Colors.slateRoot,
                }}
              >
                {capsuleResponse.capsule?.content}
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  color: Colors.oakHoneyDark,
                  fontStyle: 'italic',
                  textAlign: 'right',
                }}
              >
                {response}
              </Text>
            </Card>
          </View>
        )}
      </View>
    </Container>
  );
};
