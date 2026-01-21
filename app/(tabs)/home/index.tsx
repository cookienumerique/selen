import { Button } from "@/src/components/button";
import { Container } from "@/src/components/layout/container";
import { Header } from "@/src/components/layout/header";
import { MoonBackground } from "@/src/components/layout/moon-background";
import HaloButton from "@/src/components/shared/halo-button";
import { Text } from "@/src/components/texts";
import { Title } from "@/src/components/texts/title";
import { Colors } from "@/src/constants/theme";
// import { useCapsules } from "@/src/contexts/use-capsules";
import { useUser } from "@/src/contexts/use-user";
import HelloGreeting from "@/src/features/auth/components/user-greeting";
import { LoginButton } from "@/src/features/home/components/login-button";
import { FontAwesome5 } from "@expo/vector-icons";
import { router } from "expo-router";
import { ActivityIndicator, View } from "react-native";

export default function HomeScreen() {
  const { user, isLoadingUser } = useUser();
  const handleDiscoverCapsule = () => {
    router.push("/unlock-capsule");
  };

  return (
    <Container>
      <MoonBackground />
      <View style={{ gap: 16 }}>
        <Header />
        <HelloGreeting />
      </View>
      <View
        style={{
          flex: 1,
          paddingBottom: 16,
        }}
      >
        {isLoadingUser && (
          <View style={{ flex: 1, justifyContent: "center", gap: 16 }}>
            <ActivityIndicator />
            <Text style={{ textAlign: "center" }}>
              Chargement des données...
            </Text>
          </View>
        )}
        {!isLoadingUser && (
          <>
            <View style={{ flex: 1, justifyContent: "center", gap: 32 }}>
              <Title
                style={{
                  zIndex: 2,
                  color: Colors.oakHoney,
                  textAlign: "center",
                  fontSize: 32,
                  lineHeight: 48,
                }}
              >
                Bienvenue dans ton moment de clarté intérieure 🌿
              </Title>

              <Text
                style={{
                  zIndex: 2,
                  textAlign: "center",
                  fontSize: 20,
                  color: Colors.slateRoot,
                }}
              >
                Un espace pour ralentir, écrire, respirer… et te reconnecter à
                toi-même
              </Text>
            </View>

            {!user && <LoginButton />}
            {user && (
              <View style={{ position: "relative" }}>
                <HaloButton />
                <Button
                  style={{ width: "100%" }}
                  onPress={handleDiscoverCapsule}
                >
                  <FontAwesome5
                    name="capsules"
                    size={14}
                    color={Colors.oakHoneyDark}
                  />
                  <Text style={{ fontSize: 14, color: Colors.oakHoneyDark }}>
                    Je découvre ma capsule
                  </Text>
                </Button>
              </View>
            )}
          </>
        )}
      </View>
    </Container>
  );
}
