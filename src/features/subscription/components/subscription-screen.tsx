import { Header } from '@/src/components/layout/header';
import { Text } from '@/src/components/texts';
import { Colors } from '@/src/constants/theme';
import { FeaturesList } from '@/src/features/subscription/components/features-list';
import { OffersTabs } from '@/src/features/subscription/components/offers/offers-tabs';
import { router } from 'expo-router';
import React from 'react';
import { Image, ImageBackground, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
export const SubscriptionScreen = () => {
  const handleGoBack = () => {
    router.push('/(tabs)/home');
  };

  return (
    <ImageBackground
      source={require('@/assets/images/subscription/background.png')}
      resizeMode="cover"
      style={{
        height: '100%',
        width: '100%',
        alignItems: 'center',
        gap: 8,
      }}
    >
      <SafeAreaView>
        <View >
          <Header title="Selen infini" onPress={handleGoBack} />
          <ScrollView
            contentContainerStyle={{ gap: 24, padding: 16 }}
            showsVerticalScrollIndicator={false}
          >
            <View
              style={{
                flexDirection: 'row',
                gap: 8,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Image
                source={require('@/assets/images/subscription/infinity.png')}
                style={{
                  width: 50,
                  height: 30,
                  resizeMode: 'contain',
                }}
              />
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: 'bold',
                  textAlign: 'center',
                  color: Colors.linenCloud,
                }}
              >
                Bienvenue dans l&apos;infini
              </Text>
            </View>
            <View>
              <Text style={{ color: Colors.linenCloud, textAlign: 'center' }}>
                Tes réflexions sont tes fondations.
              </Text>
              <Text style={{ color: Colors.linenCloud, textAlign: 'center' }}>
                Ne perds plus jamais la trace de ton évolution.
              </Text>
            </View>
            <FeaturesList />
            <OffersTabs />
          </ScrollView>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};
