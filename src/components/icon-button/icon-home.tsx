import { Colors } from "@/src/constants/theme";
import { Octicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { TouchableOpacity } from "react-native";

export default function IconHome() {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: "white",
        borderRadius: 100,
        padding: 8,
      }}
      onPress={() => router.replace("/")}
    >
      <Octicons name="home" size={20} color={Colors.oakHoneyDark} />
    </TouchableOpacity>
  );
}
