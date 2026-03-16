import { Colors } from "@/src/constants/theme";
import { View, ViewStyle } from "react-native";

type CornerProps = {
    style: ViewStyle;
    color: string;
}
export const Corner = ({ style, color = Colors.linenCloud }: CornerProps) => {
    const borderWidth = 2;
    return (
        <View style={[{ position: "absolute" }, style]}>
            <View
                style={{
                    width: 18,
                    height: 18,
                    position: 'relative',
                    borderLeftWidth: borderWidth,
                    borderBottomWidth: borderWidth,
                    borderColor: color,
                    borderBottomLeftRadius: 40,
                }}
            >
                <View style={{ position: 'absolute', width: 6, height: 6, backgroundColor: color, borderRadius: 100, top: -4, right: -4 }} />

                <View style={{ height: borderWidth, width: 70, backgroundColor: color, position: 'absolute', bottom: 16, left: -70 }} />
                <View style={{ height: borderWidth, width: 50, backgroundColor: color, position: 'absolute', bottom: 10, left: -50 }} />

                <View style={{ height: 70, width: borderWidth, backgroundColor: color, position: 'absolute', bottom: -70, left: 16 }} />
                <View style={{ height: 40, width: borderWidth, backgroundColor: color, position: 'absolute', bottom: -40, right: 5 }} />
            </View>
        </View>
    )
}