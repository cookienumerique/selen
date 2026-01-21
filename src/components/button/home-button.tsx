import { Button } from "@/src/components/button";
import { Text } from "@/src/components/texts";
import { Colors } from "@/src/constants/theme";
import { Octicons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function HomeButton() {
  const handleReturnToHome = () => {
    router.replace("/");
  };

  const fontSize = 14;
  return (
    <Button
      onPress={handleReturnToHome}
      style={{
        borderWidth: 2,
        borderColor: Colors.oakHoneyDark,
        backgroundColor: Colors.warmSand,
      }}
    >
      <Octicons name="home" size={fontSize} color={Colors.oakHoneyDark} />
      <Text
        style={{
          fontSize: fontSize,
          color: Colors.oakHoneyDark,
        }}
      >
        Revenir à l&apos;accueil
      </Text>
    </Button>
  );
}
