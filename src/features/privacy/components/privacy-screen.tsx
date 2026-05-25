import { Card } from '@/src/components/card';
import { Container } from '@/src/components/layout/container';
import { Header } from '@/src/components/layout/header';
import { Text } from '@/src/components/texts';
import { Colors } from '@/src/constants/theme';
import { useUser } from '@/src/contexts/use-user';
import { useSaveConsent } from '@/src/features/consent/hooks/use-save-consent';
import * as WebBrowser from 'expo-web-browser';
import { router } from 'expo-router';
import React from 'react';
import { Switch, View } from 'react-native';
import Toast from 'react-native-toast-message';

const PRIVACY_POLICY_URL = 'https://instantselen.fr/politique-de-confidentialite';

export default function PrivacyScreen() {
  const { user } = useUser();
  const { mutate, isPending } = useSaveConsent();

  const aiOptin = user?.consentAiOptin === true;

  const handleToggle = (value: boolean) => {
    if (isPending) return;
    mutate({ aiOptin: value });
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
    <Container>
      <Header
        title="Confidentialité"
        onPress={() => router.push('/(tabs)/settings')}
      />
      <View style={{ flex: 1, padding: 16, gap: 16 }}>
        <Card>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <View style={{ flex: 1, paddingRight: 12 }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '600',
                  color: Colors.oakHoneyDark,
                }}
              >
                Réponse de la lune (IA)
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  color: Colors.slateRoot,
                  marginTop: 4,
                  lineHeight: 18,
                }}
              >
                Si activé, tes réponses sont transmises à un service
                d&apos;intelligence artificielle (OpenAI, USA) pour générer un
                résumé-miroir en 2 phrases.
              </Text>
            </View>
            <Switch
              value={aiOptin}
              onValueChange={handleToggle}
              disabled={isPending}
              trackColor={{ false: Colors.slateRoot, true: Colors.oakHoneyDark }}
              thumbColor="white"
            />
          </View>
        </Card>

        <Text
          onPress={handleOpenPolicy}
          style={{
            fontSize: 14,
            color: Colors.slateRoot,
            textAlign: 'center',
            marginTop: 8,
            textDecorationLine: 'underline',
          }}
        >
          Voir la politique de confidentialité
        </Text>
      </View>
    </Container>
  );
}
