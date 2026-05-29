import { Button } from '@/src/components/button';
import { Container } from '@/src/components/layout/container';
import { Text } from '@/src/components/texts';
import { Colors } from '@/src/constants/theme';
import React from 'react';
import { Linking, ScrollView, View } from 'react-native';

type CareScreenProps = {
  onContinue: () => void;
  isSubmitting: boolean;
};

export const CareScreen = ({ onContinue, isSubmitting }: CareScreenProps) => {
  return (
    <Container style={{ backgroundColor: Colors.warmSand }}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          padding: 24,
          justifyContent: 'space-between',
        }}
      >
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text style={{ fontSize: 40, textAlign: 'center' }}>🌙</Text>

          <Text
            family="seasons"
            variant="bold"
            style={{
              color: Colors.slateRoot,
              fontSize: 26,
              textAlign: 'center',
              marginTop: 24,
            }}
          >
            {'Merci de l\'avoir dit.'}
          </Text>

          <Text
            style={{
              color: Colors.slateRoot,
              fontSize: 14,
              lineHeight: 24,
              textAlign: 'center',
              marginTop: 20,
            }}
          >
            {'Selen propose des outils de bien-être quotidiens. Ce n\'est pas un soin médical ni un service d\'urgence.'}
          </Text>

          <View
            style={{
              backgroundColor: 'rgba(184,198,169,0.25)',
              borderRadius: 12,
              padding: 16,
              marginTop: 24,
            }}
          >
            <Text
              style={{
                color: Colors.slateRoot,
                fontSize: 13,
                lineHeight: 21,
                textAlign: 'center',
              }}
            >
              {'Si la difficulté est forte ou durable, parles-en à un professionnel : ton médecin ou un psychologue.'}
            </Text>
            <Text
              style={{
                color: Colors.slateRoot,
                fontSize: 13,
                lineHeight: 21,
                textAlign: 'center',
                marginTop: 10,
              }}
            >
              {'Et si c\'est urgent, le 3114 est là.'}
            </Text>
            <Text
              family="seasons"
              variant="bold"
              onPress={() => Linking.openURL('tel:3114')}
              style={{
                color: Colors.slateRoot,
                fontSize: 28,
                textAlign: 'center',
                letterSpacing: 2,
                marginTop: 6,
              }}
            >
              3114
            </Text>
            <Text
              style={{
                color: Colors.sateRootLight,
                fontSize: 11,
                textAlign: 'center',
                marginTop: 4,
              }}
            >
              {'gratuit, 24h/24, confidentiel'}
            </Text>
          </View>
        </View>

        <View style={{ marginTop: 24 }}>
          <Button
            onPress={onContinue}
            disabled={isSubmitting}
            style={{
              backgroundColor: Colors.slateRoot,
              width: '100%',
              opacity: isSubmitting ? 0.4 : 1,
            }}
          >
            <Text variant="bold" style={{ color: Colors.linenCloud }}>
              {'Continuer'}
            </Text>
          </Button>
        </View>
      </ScrollView>
    </Container>
  );
};
