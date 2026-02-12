import { useMenu } from "@/src/components/menu";
import { Pressable } from "react-native";

type MenuItemProps = {
    onPress: () => void;
    children: React.ReactNode;
}

export const MenuItem = ({ onPress, children }: MenuItemProps) => {
    const { closeMenu } = useMenu();

    const handlePress = () => {
        closeMenu();
        onPress();
    };

    return (
        <Pressable
            onPress={handlePress}
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 8,
                paddingVertical: 12,
                paddingHorizontal: 16,
            }}
        >
            {children}
        </Pressable>)
}