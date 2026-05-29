import { Button } from '@/src/components/button';
import { Container } from '@/src/components/layout/container';
import { Text } from '@/src/components/texts';
import { Colors } from '@/src/constants/theme';
import React from 'react';
import { Linking, ScrollView, View } from 'react-native';

type WelcomeScreenProps = {
  onContinue: () => void;
};

export const WelcomeScreen = ({ onContinue }: WelcomeScreenProps) => {
  return (
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
            family="seasons"
            style={{ color: Colors.warmSand, fontSize: 44, textAlign: 'center' }}
          >
            🌙
          </Text>

          <Text
            family="seasons"
            variant="bold"
            style={{
              color: Colors.warmSand,
              fontSize: 32,
              textAlign: 'center',
              marginTop: 24,
            }}
          >
            Bienvenue.
          </Text>

          <Text
            family="seasons"
            style={{
              color: Colors.sageMist,
              fontSize: 18,
              textAlign: 'center',
              marginTop: 16,
              lineHeight: 26,
            }}
          >
            Un espace pour rester en lien avec toi, au quotidien.
          </Text>

          <Text
            style={{
              color: Colors.warmSand,
              textAlign: 'center',
              marginTop: 28,
              lineHeight: 22,
            }}
          >
            Selen accompagne ton bien-être. Ce n&apos;est pas un soin
            psychologique.
          </Text>

          <Text
            style={{
              color: Colors.warmSand,
              textAlign: 'center',
              marginTop: 8,
              lineHeight: 22,
              opacity: 0.75,
              fontSize: 14,
            }}
          >
            Pour ça, un·e professionnel·le est précieux·se.
          </Text>

          <View
            style={{
              backgroundColor: 'rgba(184,198,169,0.18)',
              borderWidth: 1,
              borderColor: 'rgba(184,198,169,0.35)',
              borderRadius: 12,
              padding: 16,
              marginTop: 28,
            }}
          >
            <Text
              style={{
                color: Colors.warmSand,
                textAlign: 'center',
                fontSize: 13,
                lineHeight: 20,
              }}
            >
              Si tu traverses un moment difficile, le 3114 est là pour toi.
            </Text>
            <Text
              family="seasons"
              variant="bold"
              onPress={() => Linking.openURL('tel:3114')}
              style={{
                color: Colors.warmSand,
                fontSize: 32,
                textAlign: 'center',
                marginTop: 8,
                letterSpacing: 2,
              }}
            >
              3114
            </Text>
            <Text
              style={{
                color: Colors.sageMist,
                textAlign: 'center',
                fontSize: 11,
                marginTop: 4,
              }}
            >
              gratuit, 24h/24, confidentiel
            </Text>
          </View>
        </View>

        <View style={{ marginTop: 32 }}>
          <Button
            onPress={onContinue}
            style={{ backgroundColor: Colors.sageMist, width: '100%' }}
          >
            <Text style={{ color: Colors.slateRoot }} variant="bold">
              Continuer
            </Text>
          </Button>
        </View>
      </ScrollView>
    </Container>
  );
};
