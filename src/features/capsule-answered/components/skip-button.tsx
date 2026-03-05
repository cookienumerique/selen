import { Button } from '@/src/components/button';
import { Text } from '@/src/components/texts';
import { Colors } from '@/src/constants/theme';
import { Octicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
export const SkipButton = () => {
  const handleReturnToHome = () => {
    router.push('/home');
  };
  return (
    <Button
      onPress={handleReturnToHome}
      style={{
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
        justifyContent: 'center',
      }}
    >
      <Octicons name="heart" size={14} color={Colors.linenCloud} />
      <Text
        style={{
          fontSize: 14,
          color: Colors.linenCloud,
        }}
      >
        Garder pour moi et reprendre ma journée
      </Text>
    </Button>
  );
};
