import { Button } from "@/src/components/button";
import { Text } from "@/src/components/texts";
import { env } from "@/src/config/env";
import { useGoogleLogin } from "@/src/features/auth/hooks/use-google-login";
import * as MailComposer from "expo-mail-composer";
import { Image, TouchableOpacity, View } from "react-native";

export const LoginButton = () => {
  const { login, isLoading, error } = useGoogleLogin();
  const handleLogin = async () => {
    try {
      await login();
    } catch (error: any) {
      console.log("Google Sign-In Error:", error?.message || error);
    }
  };

  const handleContactSupport = async ({ message }: ContactUsFormValues) => {
    try {
      await MailComposer.composeAsync({
        recipients: [env?.SUPPORT_MAIL],
        subject: "Message depuis l'application SELEN",
        body: message,
      });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <View style={{ gap: 16 }}>
      <Button
        onPress={handleLogin}
        disabled={isLoading}
        style={{
          backgroundColor: "white",
          flexDirection: "row",
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
      {error && (
        <TouchableOpacity onPress={handleContactSupport}>
          <View
            style={{
              borderWidth: 2,
              borderColor: "#fc8181",
              backgroundColor: "#fff5f5",
              borderRadius: 8,
              padding: 16,
            }}
          >
            <Text
              style={{ fontSize: 14, fontWeight: "bold", color: "#c53030" }}
            >
              Une erreur est survenue lors de la connexion
            </Text>
            <Text style={{ fontSize: 12, color: "#c53030" }}>
              Contactez notre support pour plus d&apos;informations
            </Text>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};
