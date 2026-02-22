import { Button } from '@/src/components/button';
import { Text } from '@/src/components/texts';
import { Colors } from '@/src/constants/theme';
import React from 'react';

type OfferButtonProps = {
  isActive: boolean;
  onPress: () => void;
  label: string;
};

export const OfferButton = ({ isActive, onPress, label }: OfferButtonProps) => {
  return (
    <Button
      style={{
        flex: 1,
        borderWidth: isActive ? 2 : 0,
        borderColor: isActive ? Colors.slateRoot : Colors.warmSand,
        backgroundColor: isActive ? Colors.linenCloud : 'transparent',
        borderRadius: 16,
      }}
      onPress={onPress}
    >
      <Text
        style={{
          color: isActive ? Colors.slateRoot : 'white',
          fontWeight: 'bold',
        }}
      >
        {label}
      </Text>
    </Button>
  );
};
