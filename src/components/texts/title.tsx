import { Colors, Fonts } from '@/src/constants/theme';
import { Text, type TextProps } from 'react-native';

export function Title({ style, ...rest }: TextProps) {
  return (
    <Text
      style={[
        {
          fontFamily: Fonts.sansBold,
          fontSize: 32,
          lineHeight: 32,
          color: Colors.oakHoney,
        },
        style,
      ]}
      {...rest}
    />
  );
}
