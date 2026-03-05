import { Fonts } from '@/src/constants/theme';
import {
  Text as RNText,
  StyleSheet,
  TextStyle,
  type TextProps,
} from 'react-native';
export function Text({ style, ...rest }: TextProps) {
  const flattenedStyle = StyleSheet.flatten(style) || {};
  const { fontStyle, fontWeight } = flattenedStyle;
  let fontFamily = Fonts.sans;

  if (fontWeight === 'bold') {
    fontFamily = Fonts.sansBold;
  }

  if (fontStyle === 'italic') {
    fontFamily = Fonts.sansItalic;
  }

  if (fontWeight === 'light') {
    fontFamily = Fonts.sansLight;
  }
  return <RNText style={[{ fontFamily } as TextStyle, style]} {...rest} />;
}
