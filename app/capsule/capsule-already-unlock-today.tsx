import HomeButton from "@/src/components/button/home-button";
import { Container } from "@/src/components/layout/container";
import { HaloBackground } from "@/src/components/layout/halo-background";
import { Header } from "@/src/components/layout/header";
import { Colors } from "@/src/constants/theme";
import { Image, Text, View } from "react-native";

export default function CapsuleAlreadyUnlockToday() {
  return (
    <Container>
      <HaloBackground />
      <Header />

      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          gap: 64,
        }}
      >
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 64,
          }}
        >
          <Image
            source={require("@/assets/images/capsule.png")}
            style={{
              width: 250,
              height: 100,
              resizeMode: "contain",
            }}
          />
        </View>
        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
            color: Colors.slateRoot,
            textAlign: "center",
          }}
        >
          Tu as déjà ouvert une capsule aujourd&apos;hui !
        </Text>
        <Text
          style={{
            fontSize: 20,
            color: Colors.oakHoneyDark,
            textAlign: "center",
            fontStyle: "italic",
          }}
        >
          Reviens demain pour une nouvelle découverte sur toi même
        </Text>
      </View>
      <HomeButton />
    </Container>
  );
}
