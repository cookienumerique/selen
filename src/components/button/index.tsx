import { Colors } from '@/src/constants/theme';
import React from 'react';
import { Pressable, PressableProps, StyleProp, ViewStyle } from 'react-native';

type ButtonProps = Omit<PressableProps, 'style'> & {
  style?: StyleProp<ViewStyle>;
};

export function Button({ style, disabled, ...rest }: ButtonProps) {
  return (
    <Pressable
      disabled={disabled}
      style={[
        {
          backgroundColor: Colors.oakHoney,
          paddingVertical: 16,
          paddingHorizontal: 16,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 100,
          gap: 16,
        },
        style,
      ]}
      {...rest}
    />
  );
}
