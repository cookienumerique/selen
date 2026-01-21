import { Colors } from "@/src/constants/theme";
import { LoginButton } from "@/src/features/home/components/login-button";
import { Image, Text, View } from "react-native";

export default function ConnectionRequired() {
  return (
    <>
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
          Vous devez être connecté pour accéder à cette section
        </Text>
      </View>
      <LoginButton />
    </>
  );
}
