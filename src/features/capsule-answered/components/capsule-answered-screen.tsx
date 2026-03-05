import { Container } from '@/src/components/layout/container';
import { Header } from '@/src/components/layout/header';
import { Text } from '@/src/components/texts';
import { Colors } from '@/src/constants/theme';
import { CapsulePreview } from '@/src/features/capsule-answered/components/capsule-preview';
import { CapsuleShareTemplate } from '@/src/features/capsule-answered/components/capsule-share-template';
import { ShareButton } from '@/src/features/capsule-answered/components/share-button';
import { SkipButton } from '@/src/features/capsule-answered/components/skip-button';
import { useCapsuleShare } from '@/src/features/capsule-answered/hooks/use-capsule-share';
import { CapsuleResponse } from '@/src/features/capsule-reponse/types/capsule-response.types';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { ScrollView, View } from 'react-native';
import ViewShot from 'react-native-view-shot';

export default function CapsuleCompletionScreen() {
  const { capsule: capsuleParam } = useLocalSearchParams<{ capsule: string }>();
  const capsuleResponse = JSON.parse(capsuleParam) as CapsuleResponse;
  const { capsule } = capsuleResponse ?? {};
  const { viewShotRef, shareImage } = useCapsuleShare();

  if (!capsuleResponse) return null;
  return (
    <Container>
      <ScrollView contentContainerStyle={{ flex: 1 }}>
        <View style={{ flex: 1, gap: 24 }}>
          <Header />
          <View style={{ gap: 32, flex: 1 }}>
            <View style={{ alignItems: 'center', gap: 4 }}>
              <Text style={{ fontSize: 16, color: Colors.oakHoneyDark }}>CAPSULE DU JOUR</Text>
              <Text style={{ fontSize: 16, color: Colors.oakHoneyDark, fontStyle: 'italic' }}>
                {capsule?.subThemeCapsule?.name}
              </Text>
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 'auto', gap: 64 }}>
              <Text family="seasons" variant="bold" style={{ fontSize: 36, color: Colors.oakHoneyDark }}>C&apos;est déposé.</Text>
              <CapsulePreview capsule={capsule} />
            </View>
          </View>
          <View style={{ gap: 16, alignItems: 'center' }}>
            <Text style={{ color: Colors.gray }}>Partager ma capsule du jour</Text>
            <View style={{ flexDirection: 'row', gap: 32, justifyContent: 'space-between' }}>
              <ShareButton target="instagram" onPress={shareImage} />
              <ShareButton target="facebook" onPress={shareImage} />
            </View>
          </View>
          <SkipButton />
        </View>
        <ViewShot
          ref={viewShotRef}
          style={{ position: 'absolute', left: -9999 }}
        >
          <CapsuleShareTemplate
            capsule={capsule}
          />
        </ViewShot>
      </ScrollView>
    </Container >
  );
}
