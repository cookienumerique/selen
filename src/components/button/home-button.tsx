import { Button } from "@/src/components/button";
import { Text } from "@/src/components/texts";
import { Colors } from "@/src/constants/theme";
import { Octicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { View } from "react-native";

export default function HomeButton() {
  const handleReturnToHome = () => {
    router.replace("/");
  };

  const fontSize = 18;
  return (
    <Button
      onPress={handleReturnToHome}
      style={{
        borderWidth: 2,
        borderColor: Colors.oakHoneyDark,
        backgroundColor: Colors.warmSand,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center", gap: 16 }}>
        <Octicons name="home" size={fontSize} color={Colors.oakHoneyDark} />
        <Text
          style={{
            fontSize: fontSize,
            color: Colors.oakHoneyDark,
          }}
        >
          Revenir à l&apos;accueil
        </Text>
      </View>
    </Button>
  );
}
