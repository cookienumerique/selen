import { Container } from "@/src/components/layout/container";
import { Header } from "@/src/components/layout/header";
import { MoonBackground } from "@/src/components/layout/moon-background";
import { Text } from "@/src/components/texts";
import { env } from "@/src/config/env";
import { useUser } from "@/src/contexts/use-user";
import { UserAvatarName } from "@/src/features/auth/components/user-avatar-name";
import { Entypo, Ionicons } from "@expo/vector-icons";
import MaterialDesignIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { router } from "expo-router";
import React from "react";
import { TouchableOpacity, View } from "react-native";

const MyAccountItem = ({
  label,
  icon,
  onPress,
}: {
  label: string;
  icon: React.ReactNode;
  onPress: () => void;
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 16 }}>
          {icon}
          <Text style={{ color: "gray" }}>{label}</Text>
        </View>
        <Entypo name="chevron-right" size={24} color="gray" />
      </View>
    </TouchableOpacity>
  );
};
export default function MyAccount() {
  const sizeIcon = 24;
  const colorIcon = "gray";
  const { user, logout } = useUser();

  return (
    <Container>
      <MoonBackground />
      <View style={{ gap: 16, flex: 1 }}>
        <Header />
        <UserAvatarName />
        <View
          style={{
            borderRadius: 16,
            backgroundColor: "white",
            padding: 16,
            gap: 24,
          }}
        >
          <MyAccountItem
            onPress={() => router.push("/my-account-user")}
            label="Mon compte"
            icon={
              <MaterialDesignIcons
                name="account"
                size={sizeIcon}
                color={colorIcon}
              />
            }
          />
          <MyAccountItem
            onPress={() => router.push("/about-us")}
            label="A propos de nous"
            icon={<Ionicons name="people" size={sizeIcon} color={colorIcon} />}
          />
          <MyAccountItem
            onPress={() => router.push("/contact-us")}
            label="Nous contacter"
            icon={
              <MaterialDesignIcons
                name="tooltip-question"
                size={sizeIcon}
                color={colorIcon}
              />
            }
          />
        </View>
      </View>
      {user && (
        <View style={{ borderRadius: 16, padding: 16, gap: 16 }}>
          <TouchableOpacity
            onPress={() => {
              logout();
              router.push("/home");
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
              }}
            >
              <MaterialDesignIcons
                name="logout"
                size={sizeIcon}
                color={colorIcon}
              />
              <Text style={{ color: "gray" }}>Se déconnecter</Text>
            </View>
          </TouchableOpacity>
        </View>
      )}
      <Text style={{ color: "gray", textAlign: "center", fontSize: 12 }}>
        v{env.VERSION}
      </Text>
    </Container>
  );
}
