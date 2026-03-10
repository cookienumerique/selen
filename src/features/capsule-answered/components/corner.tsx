import { Colors } from "@/src/constants/theme";
import { View, ViewStyle } from "react-native";
export const Corner = ({ style }: { style: ViewStyle }) => {
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
                    borderColor: Colors.slateRoot,
                    borderBottomLeftRadius: 40,
                }}
            >
                <View style={{ position: 'absolute', width: 6, height: 6, backgroundColor: Colors.slateRoot, borderRadius: 100, top: -4, right: -4 }} />

                <View style={{ height: borderWidth, width: 70, backgroundColor: Colors.slateRoot, position: 'absolute', bottom: 16, left: -70 }} />
                <View style={{ height: borderWidth, width: 50, backgroundColor: Colors.slateRoot, position: 'absolute', bottom: 10, left: -50 }} />

                <View style={{ height: 70, width: borderWidth, backgroundColor: Colors.slateRoot, position: 'absolute', bottom: -70, left: 16 }} />
                <View style={{ height: 40, width: borderWidth, backgroundColor: Colors.slateRoot, position: 'absolute', bottom: -40, right: 5 }} />
            </View>
        </View>
    )
}