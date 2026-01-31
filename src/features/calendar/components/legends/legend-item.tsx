import { LegendDot } from "@/src/features/calendar/components/legends/legend-dot";
import { LegendName } from "@/src/features/calendar/components/legends/legend-name";
import { View } from "react-native";
export const LegendItem = ({ color, name }: { color: string, name: string }) => {
    return (
        <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center', width: '50%' }}>
            <LegendDot color={color} />
            <LegendName name={name} />
        </View>
    );
}