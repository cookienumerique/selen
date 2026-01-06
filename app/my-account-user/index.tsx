import { Container } from "@/src/components/layout/container";
import { Header } from "@/src/components/layout/header";
import { MoonBackground } from "@/src/components/layout/moon-background";
import { Text } from "@/src/components/texts";
import { Colors } from "@/src/constants/theme";
import { useUser } from "@/src/contexts/use-user";
import { UserAvatarName } from "@/src/features/auth/components/user-avatar-name";
import { Foundation, Ionicons } from "@expo/vector-icons";
import React from "react";
import { View } from "react-native";

const UserItem = ({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
}) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          gap: 8,
          alignItems: "center",
        }}
      >
        {icon}
        <Text style={{ color: "darkgray", fontWeight: "regular" }}>
          {label}
        </Text>
      </View>
      <Text style={{ color: Colors.gray }}>{value}</Text>
    </View>
  );
};
export default function MyAccountUser() {
  const { user } = useUser();
  return (
    <Container>
      <MoonBackground />
      <View style={{ gap: 16, flex: 1 }}>
        <Header canGoBack />
        <UserAvatarName />
        <View
          style={{
            backgroundColor: "white",
            padding: 16,
            borderRadius: 16,
            gap: 24,
          }}
        >
          <UserItem
            label="Nom"
            value={user?.name ?? ""}
            icon={<Ionicons name="people" size={20} color="darkgray" />}
          />
          <UserItem
            label="Email"
            value={user?.email ?? ""}
            icon={<Foundation name="mail" size={20} color="darkgray" />}
          />
        </View>
      </View>
    </Container>
  );
}
