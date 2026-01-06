import { Fonts } from "@/src/constants/theme";
import { Text as RNText, type TextProps } from "react-native";

export function Text({ style, ...rest }: TextProps) {
  return <RNText style={[{ fontFamily: Fonts.sans }, style]} {...rest} />;
}
