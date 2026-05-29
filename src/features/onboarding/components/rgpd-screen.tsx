import { Button } from '@/src/components/button';
import { Container } from '@/src/components/layout/container';
import { Text } from '@/src/components/texts';
import { Colors } from '@/src/constants/theme';
import { openPolicy } from '@/src/features/consent/utils/open-policy';
import React from 'react';
import { ScrollView, View } from 'react-native';

type RgpdScreenProps = {
  onAccept: () => void;
  onRefuse: () => void;
};

export const RgpdScreen = ({ onAccept, onRefuse }: RgpdScreenProps) => {
  return (
    <Container style={{ backgroundColor: Colors.warmSand }}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          padding: 24,
          justifyContent: 'space-between',
        }}
      >
        <View>
          <Text style={{ fontSize: 38, textAlign: 'center', marginTop: 8 }}>
            🔒
          </Text>

          <Text
            family="seasons"
            variant="bold"
            style={{
              color: Colors.slateRoot,
              fontSize: 26,
              textAlign: 'center',
              marginTop: 18,
            }}
          >
            {'Tes données t\'appartiennent'}
          </Text>

          <Text
            style={{
              color: Colors.slateRoot,
              fontSize: 13,
              lineHeight: 21,
              textAlign: 'center',
              marginTop: 14,
            }}
          >
            {'Selen traite des données sensibles sur ton bien-être. Voici comment on les protège.'}
          </Text>

          <View
            style={{
              backgroundColor: 'rgba(255,255,255,0.5)',
              borderWidth: 1,
              borderColor: 'rgba(47,62,70,0.1)',
              borderRadius: 12,
              padding: 14,
              marginTop: 20,
            }}
          >
            <Text
              variant="bold"
              style={{ fontSize: 13, color: Colors.slateRoot, marginBottom: 4 }}
            >
              {'Tes contenus'}
            </Text>
            <Text
              style={{
                fontSize: 12.5,
                lineHeight: 18,
                color: Colors.sateRootLight,
              }}
            >
              {'Météos, capsules, journal, stockés en France et chiffrés. Tu peux tout supprimer à tout moment.'}
            </Text>
          </View>

          <View
            style={{
              backgroundColor: 'rgba(255,255,255,0.5)',
              borderWidth: 1,
              borderColor: 'rgba(47,62,70,0.1)',
              borderRadius: 12,
              padding: 14,
              marginTop: 10,
            }}
          >
            <Text
              variant="bold"
              style={{ fontSize: 13, color: Colors.slateRoot, marginBottom: 4 }}
            >
              {'Données de santé (art. 9 RGPD)'}
            </Text>
            <Text
              style={{
                fontSize: 12.5,
                lineHeight: 18,
                color: Colors.sateRootLight,
              }}
            >
              {'Ton consentement explicite est requis pour traiter ces données. Tu peux le retirer à tout moment dans les paramètres.'}
            </Text>
          </View>

          <Text
            onPress={openPolicy}
            style={{
              color: Colors.sageMistDark,
              fontSize: 12,
              textAlign: 'center',
              textDecorationLine: 'underline',
              marginTop: 16,
            }}
          >
            {'Lire la politique de confidentialité complète'}
          </Text>
        </View>

        <View style={{ marginTop: 24, gap: 12 }}>
          <Button
            onPress={onAccept}
            style={{ backgroundColor: Colors.slateRoot, width: '100%' }}
          >
            <Text variant="bold" style={{ color: Colors.linenCloud }}>
              {'J\'accepte'}
            </Text>
          </Button>
          <Button
            onPress={onRefuse}
            style={{
              backgroundColor: 'transparent',
              borderWidth: 1.5,
              borderColor: 'rgba(47,62,70,0.2)',
              width: '100%',
            }}
          >
            <Text variant="bold" style={{ color: Colors.slateRoot }}>
              {'Je préfère ne pas accepter'}
            </Text>
          </Button>
        </View>
      </ScrollView>
    </Container>
  );
};
