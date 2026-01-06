import { Button } from "@/src/components/button";
import { Text } from "@/src/components/texts";
import { useGoogleLogin } from "@/src/features/auth/hooks/use-google-login";
import { Image, View } from "react-native";

export const LoginButton = () => {
  const { login, isLoading, error } = useGoogleLogin();
  const handleLogin = async () => {
    try {
      await login();
    } catch (error: any) {
      console.log("Google Sign-In Error:", error?.message || error);
    }
  };
  if (error) {
    return <Text>Une erreur est survenue lors de la connexion</Text>;
  }
  return (
    <Button
      onPress={handleLogin}
      disabled={isLoading}
      style={{
        backgroundColor: "white",
        flexDirection: "row",
        gap: 16,
        borderWidth: 1,
        borderColor: "gray",
      }}
    >
      <View style={{ flexDirection: "row", gap: 16, alignItems: "center" }}>
        <Image
          source={require("@/assets/images/google-logo.svg")}
          style={{ width: 20, height: 20 }}
        />
        <Text style={{ color: "gray", fontWeight: "bold" }}>
          Se connecter avec Google
        </Text>
      </View>
    </Button>
  );
};
