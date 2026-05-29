import { Button } from '@/src/components/button';
import { Container } from '@/src/components/layout/container';
import { Text } from '@/src/components/texts';
import { Colors } from '@/src/constants/theme';
import { openPolicy } from '@/src/features/consent/utils/open-policy';
import React from 'react';
import { ScrollView, View } from 'react-native';

type ConsentRefusedScreenProps = {
  onBack: () => void;
};

export const ConsentRefusedScreen = ({ onBack }: ConsentRefusedScreenProps) => {
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
            {'C\'est ton droit.'}
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
            {'Et on le respecte. Traiter ces données, c\'est ce qui permet à Selen de fonctionner. Sans ton accord, on ne peut pas aller plus loin ensemble pour l\'instant.'}
          </Text>

          <Text
            style={{
              color: Colors.sateRootLight,
              fontSize: 13,
              lineHeight: 22,
              textAlign: 'center',
              marginTop: 16,
            }}
          >
            {'Tu peux relire ce qu\'on en fait, ou revenir quand tu veux.'}
          </Text>
        </View>

        <View style={{ marginTop: 24, gap: 12 }}>
          <Button
            onPress={openPolicy}
            style={{ backgroundColor: Colors.slateRoot, width: '100%' }}
          >
            <Text variant="bold" style={{ color: Colors.linenCloud }}>
              {'Relire la politique'}
            </Text>
          </Button>
          <Button
            onPress={onBack}
            style={{
              backgroundColor: 'transparent',
              borderWidth: 1.5,
              borderColor: 'rgba(47,62,70,0.2)',
              width: '100%',
            }}
          >
            <Text variant="bold" style={{ color: Colors.slateRoot }}>
              {'Revenir'}
            </Text>
          </Button>
        </View>
      </ScrollView>
    </Container>
  );
};
