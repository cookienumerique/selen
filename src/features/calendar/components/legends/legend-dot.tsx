import { View } from "react-native";

export const LegendDot = ({ color }: { color: string }) => {
    return (
        <View
            style={{
                width: 8,
                height: 8,
                backgroundColor: color,
                borderRadius: 100,
            }}
        />
    );
};