import { Button } from '@/src/components/button';
import { Container } from '@/src/components/layout/container';
import { Text } from '@/src/components/texts';
import { toastConfig } from '@/src/components/toast/selen-toast';
import { Colors } from '@/src/constants/theme';
import { useUser } from '@/src/contexts/use-user';
import {
  AiConsentTrigger,
  useSaveAiConsent,
} from '@/src/features/consent/hooks/use-save-ai-consent';
import React from 'react';
import { Modal, ScrollView, View } from 'react-native';
import Toast from 'react-native-toast-message';

type AiConsentModalProps = {
  trigger: AiConsentTrigger;
};

export const AiConsentModal = ({ trigger }: AiConsentModalProps) => {
  const { user } = useUser();
  const { mutate, isPending } = useSaveAiConsent({
    onError: () => {
      Toast.show({
        type: 'error',
        text1: 'Connexion impossible',
        text2: 'Réessaie dans un instant.',
        position: 'bottom',
      });
    },
  });

  const visible = !!user && user.consentAiOptin === null;

  const choose = (optin: boolean) => {
    if (isPending) return;
    mutate({ optin, trigger });
  };

  return (
    <Modal visible={visible} animationType="fade" onRequestClose={() => {}}>
      <Container style={{ backgroundColor: Colors.slateRoot }}>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            padding: 24,
            justifyContent: 'space-between',
          }}
        >
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <Text
              style={{
                color: Colors.linenCloud,
                fontSize: 48,
                textAlign: 'center',
              }}
            >
              🌙
            </Text>

            <Text
              family="seasons"
              variant="bold"
              style={{
                color: Colors.linenCloud,
                fontSize: 26,
                textAlign: 'center',
                lineHeight: 34,
                marginTop: 24,
              }}
            >
              {'Une dernière chose, avant de commencer.'}
            </Text>

            <Text
              style={{
                color: Colors.linenCloud,
                fontSize: 14,
                lineHeight: 22,
                marginTop: 22,
              }}
            >
              {'Pour générer la « réponse de la lune » qui accompagne ta réflexion, Selen utilise une intelligence artificielle (OpenAI, États-Unis).'}
            </Text>

            <View
              style={{
                backgroundColor: 'rgba(184,198,169,0.15)',
                borderLeftWidth: 3,
                borderLeftColor: Colors.sageMist,
                borderRadius: 8,
                padding: 14,
                marginTop: 18,
              }}
            >
              <Text
                style={{
                  color: Colors.sageMist,
                  fontSize: 12.5,
                  lineHeight: 19,
                }}
              >
                {'Tes mots sont transmis pour générer une réponse personnalisée. OpenAI s\'est engagé à ne pas les utiliser pour entraîner ses modèles.'}
              </Text>
            </View>

            <Text
              style={{
                color: Colors.linenCloud,
                fontSize: 13,
                lineHeight: 21,
                fontStyle: 'italic',
                textAlign: 'center',
                marginTop: 22,
              }}
            >
              {'Tu peux refuser et continuer à utiliser Selen normalement. Météo, capsules, journal et calendrier restent accessibles sans aucune limite.'}
            </Text>
          </View>

          <View style={{ gap: 12, marginTop: 32 }}>
            <Button
              onPress={() => choose(true)}
              disabled={isPending}
              style={{
                backgroundColor: Colors.sageMist,
                width: '100%',
                opacity: isPending ? 0.5 : 1,
              }}
            >
              <Text variant="bold" style={{ color: Colors.slateRoot }}>
                {'J\'accepte'}
              </Text>
            </Button>

            <Button
              onPress={() => choose(false)}
              disabled={isPending}
              style={{
                backgroundColor: 'transparent',
                borderWidth: 1,
                borderColor: 'rgba(245,227,200,0.3)',
                width: '100%',
                opacity: isPending ? 0.5 : 1,
              }}
            >
              <Text style={{ color: Colors.linenCloud }}>
                {'Je refuse pour l\'instant'}
              </Text>
            </Button>
          </View>
        </ScrollView>
        {/* Hôte Toast interne : visible au-dessus du Modal RN. */}
        <Toast config={toastConfig} bottomOffset={40} />
      </Container>
    </Modal>
  );
};
