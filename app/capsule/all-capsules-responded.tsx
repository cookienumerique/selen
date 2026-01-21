import HomeButton from "@/src/components/button/home-button";
import { Text, View } from "react-native";
export default function AllCapsulesResponded() {
  return (
    <>
      <View style={{ flex: 1 }}>
        <Text>Toutes les capsules ont été débloquées</Text>
      </View>
      <HomeButton />
    </>
  );
}
