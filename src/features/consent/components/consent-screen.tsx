import { Button } from '@/src/components/button';
import { Container } from '@/src/components/layout/container';
import { Text } from '@/src/components/texts';
import { Colors } from '@/src/constants/theme';
import { useSaveConsent } from '@/src/features/consent/hooks/use-save-consent';
import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import { ScrollView, View } from 'react-native';
import Toast from 'react-native-toast-message';

const PRIVACY_POLICY_URL = 'https://instantselen.fr/politique-de-confidentialite';

export const ConsentScreen = () => {
  const { mutate, isPending } = useSaveConsent();

  const handleAcceptAll = () => {
    if (isPending) return;
    mutate({ aiOptin: true });
  };

  const handleContinueWithoutAi = () => {
    if (isPending) return;
    mutate({ aiOptin: false });
  };

  const handleOpenPolicy = async () => {
    try {
      await WebBrowser.openBrowserAsync(PRIVACY_POLICY_URL);
    } catch {
      Toast.show({
        type: 'info',
        text1: 'Aucun navigateur disponible',
        text2: PRIVACY_POLICY_URL,
        position: 'bottom',
      });
    }
  };

  return (
    <Container style={{ backgroundColor: Colors.slateRoot }}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          padding: 24,
          justifyContent: 'space-between',
        }}
      >
        <View>
          <Text
            family="seasons"
            style={{
              color: Colors.warmSand,
              fontSize: 28,
              textAlign: 'center',
              lineHeight: 36,
              marginTop: 16,
            }}
          >
            Avant de continuer
          </Text>

          <Text
            style={{
              color: Colors.warmSand,
              textAlign: 'center',
              marginTop: 20,
              lineHeight: 22,
              opacity: 0.85,
            }}
          >
            Selen traite tes réponses émotionnelles. La loi nous demande ton
            consentement avant de continuer.
          </Text>

          <Text
            style={{
              color: Colors.warmSand,
              textAlign: 'center',
              marginTop: 16,
              lineHeight: 22,
              opacity: 0.7,
              fontSize: 14,
            }}
          >
            La « réponse de la lune » est générée par un service d'intelligence
            artificielle (OpenAI, USA). Tu peux choisir de l'activer ou non —
            l'app fonctionne dans les deux cas.
          </Text>
        </View>

        <View style={{ gap: 12, marginTop: 32 }}>
          <Button
            onPress={handleAcceptAll}
            disabled={isPending}
            style={{
              backgroundColor: Colors.warmSand,
              width: '100%',
              opacity: isPending ? 0.5 : 1,
            }}
          >
            <Text style={{ color: Colors.slateRoot }} variant="bold">
              J'accepte tout (avec la réponse de la lune)
            </Text>
          </Button>

          <Button
            onPress={handleContinueWithoutAi}
            disabled={isPending}
            style={{
              backgroundColor: 'transparent',
              borderWidth: 1,
              borderColor: Colors.warmSand,
              width: '100%',
              opacity: isPending ? 0.5 : 1,
            }}
          >
            <Text style={{ color: Colors.warmSand }}>
              Continuer sans la réponse de la lune
            </Text>
          </Button>

          <Text
            onPress={handleOpenPolicy}
            style={{
              color: Colors.warmSand,
              fontSize: 13,
              textDecorationLine: 'underline',
              textAlign: 'center',
              marginTop: 16,
              opacity: 0.85,
            }}
          >
            Voir la politique de confidentialité
          </Text>
        </View>
      </ScrollView>
    </Container>
  );
};
