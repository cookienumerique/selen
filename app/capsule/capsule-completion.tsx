import HomeButton from "@/src/components/button/home-button";
import { Container } from "@/src/components/layout/container";
import { Header } from "@/src/components/layout/header";
import { MoonBackground } from "@/src/components/layout/moon-background";
import { Text } from "@/src/components/texts";
import { Colors } from "@/src/constants/theme";
import React from "react";
import { View } from "react-native";

export default function CapsuleCompletion() {
  return (
    <Container>
      <MoonBackground />

      <Header />
      <View
        style={{
          gap: 64,
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            color: Colors.oakHoney,
            fontSize: 32,
            fontWeight: "bold",
            textAlign: "center",
            lineHeight: 48,
          }}
        >
          Merci d&apos;avoir pris ce moment pour toi ☀️
        </Text>
        <Text
          style={{
            fontSize: 24,
            fontWeight: "regular",
            textAlign: "center",
          }}
        >
          Chaque mot posé éclaire un peu plus ton chemin.
        </Text>
      </View>
      <HomeButton />
    </Container>
  );
}
