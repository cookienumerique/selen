import { Text } from "@/src/components/texts";
import { Colors } from "@/src/constants/theme";
import { useUser } from "@/src/contexts/use-user";

export default function HelloGreeting() {
  const { user } = useUser();
  if (!user) return null;
  return (
    <Text
      style={{
        textAlign: "center",
        fontSize: 20,
        color: Colors.oakHoneyDark,
      }}
    >
      Bonjour, {user.name}
    </Text>
  );
}
