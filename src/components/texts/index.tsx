import { Fonts } from "@/src/constants/theme";
import { Text as RNText, TextProps, TextStyle } from "react-native";

type FontFamilyType = 'openSans' | 'seasons';
type FontVariant =
  | 'regular'
  | 'bold'
  | 'italic'
  | 'light'
  | 'boldItalic'
  | 'lightItalic';

type CustomTextProps = TextProps & {
  family?: FontFamilyType;
  variant?: FontVariant;
};

export function Text({
  style,
  family = 'openSans',
  variant = 'regular',
  ...rest
}: CustomTextProps) {
  const fontFamily = Fonts[family][variant] ?? Fonts[family].regular;

  return (
    <RNText
      style={[{ fontFamily } as TextStyle, style]}
      {...rest}
    />
  );
}