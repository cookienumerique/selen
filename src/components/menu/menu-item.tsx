import { useMenu } from "@/src/components/menu";
import { Pressable, PressableProps, StyleProp, ViewStyle } from "react-native";

type MenuItemProps = {
    onPress: () => void;
    children: React.ReactNode;
    style?: StyleProp<ViewStyle>;
} & PressableProps

export const MenuItem = ({ onPress, children, style, ...rest }: MenuItemProps) => {
    const { closeMenu } = useMenu();

    const handlePress = () => {
        closeMenu();
        onPress();
    };

    return (
        <Pressable
            onPress={handlePress}
            style={[{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 8,
                paddingVertical: 8,
                paddingHorizontal: 16,
            }, style]}
            {...rest}
        >
            {children}
        </Pressable>)
}