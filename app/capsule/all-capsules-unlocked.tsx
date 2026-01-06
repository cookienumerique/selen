import HomeButton from "@/src/components/button/home-button";
import { Container } from "@/src/components/layout/container";
import { HaloBackground } from "@/src/components/layout/halo-background";
import { LogoTitleApp } from "@/src/components/layout/header";
import { Text, View } from "react-native";
export default function AllCapsulesUnlocked() {
  return (
    <Container>
      <HaloBackground />
      <View style={{ alignItems: "center", marginBottom: 16 }}>
        <LogoTitleApp />
      </View>
      <View style={{ flex: 1 }}>
        <Text>Toutes les capsules ont été débloquées</Text>
      </View>
      <HomeButton />
    </Container>
  );
}
