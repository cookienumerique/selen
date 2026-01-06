import { Colors } from "@/src/constants/theme";
import React from "react";
import { ButtonProps, Button as PaperButton } from "react-native-paper";

export function Button({ style, disabled, ...rest }: ButtonProps) {
  return (
    <PaperButton
      disabled={disabled}
      mode="contained"
      style={[
        {
          alignItems: "center",
          justifyContent: "center",
          paddingVertical: 8,
          paddingHorizontal: 16,
          borderRadius: 100,
          width: "100%",
          gap: 16,
          backgroundColor: Colors.oakHoney,
          opacity: disabled ? 0.5 : 1,
        },
        style,
      ]}
      {...rest}
    />
  );
}
