import { Container } from '@/src/components/layout/container';
import { Text } from '@/src/components/texts';
import { Colors } from '@/src/constants/theme';
import { CapsuleShareTemplate } from '@/src/features/capsule-answered/components/capsule-share-template';
import { ShareButton } from '@/src/features/capsule-answered/components/share-button';
import { SkipButton } from '@/src/features/capsule-answered/components/skip-button';
import { useCapsuleShare } from '@/src/features/capsule-answered/hooks/use-capsule-share';
import { CapsuleResponse } from '@/src/features/capsule-reponse/types/capsule-response.types';
import { ResponseMoon } from '@/src/features/moon/response-moon';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Image, ScrollView, View } from 'react-native';
import ViewShot from 'react-native-view-shot';

export default function CapsuleCompletionScreen() {
  const { capsule: capsuleParam } = useLocalSearchParams<{ capsule: string }>();
  const capsuleResponse = JSON.parse(capsuleParam) as CapsuleResponse;
  const { viewShotRef, shareImage } = useCapsuleShare();
  const capsuleAnswred = capsuleResponse?.response !== '';

  if (!capsuleResponse) return null;
  return (
    <Container style={{ backgroundColor: Colors.slateRoot }}>
      <ScrollView contentContainerStyle={{ flex: 1, gap: 32, padding: 16 }}>
        <View style={{ gap: 32, flex: 1 }}>
          <Image source={require('@/assets/images/moon_selen_linencloud.png')} style={{ width: 150, height: 150, alignSelf: 'center', resizeMode: 'contain', }} />
          <Text family="seasons" variant="bold" style={{ fontSize: 16, color: Colors.linenCloud, textAlign: 'center' }}>{capsuleAnswred ? 'C\'est noté, gardé, précieusement.' : 'Pas besoin de répondre aujourd\'hui.\nReviens demain, la lune sera là."'}</Text>
          {capsuleAnswred && capsuleResponse.aiResponse && (
            <>
              <ResponseMoon response={capsuleResponse.aiResponse} />
              <View style={{ gap: 16, alignItems: 'center', marginTop: 'auto' }}>
                <Text style={{ color: Colors.linenCloud }}>Partager la réponse de la lune</Text>
                <View style={{ flexDirection: 'row', gap: 32, justifyContent: 'space-between', }}>
                  <ShareButton target="instagram" onPress={shareImage} />
                  <ShareButton target="facebook" onPress={shareImage} />
                </View>
              </View>
            </>
          )}
        </View>
        <SkipButton />
        <ViewShot
          ref={viewShotRef}
          style={{ position: 'absolute', left: -9999 }}
        >
          <CapsuleShareTemplate
            capsuleResponse={capsuleResponse}
          />
        </ViewShot>
      </ScrollView>
      {/* <MoonResponseFeedbackSheet
        context="capsule"
        contextId={capsuleResponse?.id}
      /> */}
    </Container >
  );
}
