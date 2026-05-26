import { Card } from '@/src/components/card';
import { Container } from '@/src/components/layout/container';
import { Header } from '@/src/components/layout/header';
import { Text } from '@/src/components/texts';
import { Colors } from '@/src/constants/theme';
import { useUser } from '@/src/contexts/use-user';
import { useSaveConsent } from '@/src/features/consent/hooks/use-save-consent';
import { openPolicy } from '@/src/features/consent/utils/open-policy';
import { router } from 'expo-router';
import React from 'react';
import { Switch, View } from 'react-native';

export default function PrivacyScreen() {
  const { user } = useUser();
  const { mutate, isPending } = useSaveConsent();

  const aiOptin = user?.consentAiOptin === true;

  const handleToggle = (value: boolean) => {
    if (isPending) return;
    mutate({ aiOptin: value });
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
                Réponse de la lune
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  color: Colors.oakHoneyDark,
                  marginTop: 2,
                  opacity: 0.7,
                }}
              >
                Générée par une IA
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  color: Colors.slateRoot,
                  marginTop: 8,
                  lineHeight: 18,
                }}
              >
                Quand c&apos;est activé, ce que tu écris est analysé par une
                intelligence artificielle pour générer un court miroir de 2
                phrases. Tu peux désactiver à tout moment.
              </Text>
            </View>
            <Switch
              value={aiOptin}
              onValueChange={handleToggle}
              disabled={isPending}
              trackColor={{ false: Colors.gray, true: Colors.capsule }}
              thumbColor="white"
              ios_backgroundColor={Colors.gray}
            />
          </View>
        </Card>

        <Text
          onPress={openPolicy}
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
