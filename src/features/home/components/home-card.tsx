import { Card } from '@/src/components/card';
import { Colors } from '@/src/constants/theme';
import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';

type HomeCardProps = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

export const HomeCard = ({ children, style }: HomeCardProps) => {
  return (
    <Card
      style={[
        {
          backgroundColor: Colors.warmSand,
          gap: 8,
          width: 110,
          height: 110,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 16,
        },
        style,
      ]}
    >
      {children}
    </Card>
  );
};
