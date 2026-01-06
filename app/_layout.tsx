import { CapsulesProvider } from "@/src/contexts/use-capsules";
import { UserProvider } from "@/src/contexts/use-user";
import { configureGoogleSignIn } from "@/src/features/auth/config/google-signin";
import { useFonts } from "expo-font";
import { Slot } from "expo-router";
import { useEffect } from "react";

export default function RootLayout() {
  const [loaded] = useFonts({
    "OpenSans-Regular": require("../assets/fonts/OpenSans-Regular.ttf"),
    "OpenSans-Bold": require("../assets/fonts/OpenSans-Bold.ttf"),
  });

  useEffect(() => {
    configureGoogleSignIn();
  }, []);
  if (!loaded) return null;

  return (
    <UserProvider>
      <CapsulesProvider>
        <Slot />
      </CapsulesProvider>
    </UserProvider>
  );
}
