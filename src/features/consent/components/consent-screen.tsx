import { Button } from '@/src/components/button';
import { Container } from '@/src/components/layout/container';
import { Text } from '@/src/components/texts';
import { Colors } from '@/src/constants/theme';
import { useSaveConsent } from '@/src/features/consent/hooks/use-save-consent';
import { openPolicy } from '@/src/features/consent/utils/open-policy';
import React from 'react';
import { ScrollView, View } from 'react-native';

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

  return (
    <Container style={{ backgroundColor: Colors.slateRoot }}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          padding: 24,
          justifyContent: 'space-between',
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
          }}
        >
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
            Un instant avant d&apos;entrer
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
            Selen reçoit ce que tu écris dans tes capsules et ton journal. Avant
            d&apos;aller plus loin, on a besoin de ton accord, c&apos;est ton
            droit, et c&apos;est la loi.
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
            La réponse de la lune est un court résumé-miroir, écrit par une
            intelligence artificielle. Tu choisis de l&apos;activer ou non.
            L&apos;app fonctionne dans les deux cas.
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
              J&apos;accepte tout (avec la réponse de la lune)
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
            onPress={openPolicy}
            style={{
              color: Colors.warmSand,
              fontSize: 13,
              textDecorationLine: 'underline',
              textAlign: 'center',
              marginTop: 16,
              opacity: 0.85,
            }}
          >
            Lire la politique de confidentialité
          </Text>
        </View>
      </ScrollView>
    </Container>
  );
};
