import { CapsulesProvider } from "@/src/contexts/use-capsules";
import { UserProvider } from "@/src/contexts/use-user";
import { configureGoogleSignIn } from "@/src/features/auth/config/google-signin";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { Slot } from "expo-router";
import React, { useEffect } from "react";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 1000 * 60,
    },
  },
});

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
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <CapsulesProvider>
          <Slot />
        </CapsulesProvider>
      </UserProvider>
    </QueryClientProvider>
  );
}
