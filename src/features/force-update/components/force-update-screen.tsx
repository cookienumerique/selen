import { Button } from '@/src/components/button';
import { Container } from '@/src/components/layout/container';
import { Text } from '@/src/components/texts';
import { Colors } from '@/src/constants/theme';
import { useAppUpdate } from '@/src/features/force-update/hooks/use-app-update';
import React from 'react';
import { Image, View } from 'react-native';

export const ForceUpdateScreen = () => {
  const { openStore } = useAppUpdate();
  return (
    <Container style={{ backgroundColor: Colors.slateRoot }}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Image
          style={{ width: 300, height: 300 }}
          source={require('@/assets/images/icon_selen_512.png')}
        />
        <Text
          style={{
            color: Colors.warmSand,
            fontSize: 24,
            textAlign: 'center',
            lineHeight: 40,
          }}
        >
          Selen évolue.
        </Text>

        <Text
          style={{ textAlign: 'center', marginTop: 12, color: Colors.warmSand }}
        >
          Pour continuer ton cheminement en toute sérénité, une mise à jour est
          nécessaire.
        </Text>

        <Button
          onPress={openStore}
          style={{
            backgroundColor: Colors.warmSand,
            marginTop: 'auto',
            width: '100%',
          }}
        >
          <Text style={{ color: Colors.slateRoot }}>Mettre à jour</Text>
        </Button>
      </View>
    </Container>
  );
};
