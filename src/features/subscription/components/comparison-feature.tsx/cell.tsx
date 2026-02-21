import { Colors } from "@/src/constants/theme";
import { View, ViewProps } from "react-native";

type ComparisonFeatureCellProps = {
    children: React.ReactNode;
} & ViewProps

export const ComparisonFeatureCell = ({ children, style, ...rest }: ComparisonFeatureCellProps) => {
    return (
        <View style={[{ alignItems: 'center', justifyContent: 'center', paddingVertical: 6, borderBottomWidth: 1, borderColor: Colors.gray }, style]} {...rest}>{children}</View>
    )
}