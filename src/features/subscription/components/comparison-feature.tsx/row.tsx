import { View, ViewProps } from "react-native";

type ComparisonFeatureRowProps = {
    children: React.ReactNode;
} & ViewProps

export const ComparisonFeatureRow = ({ children, style, ...rest }: ComparisonFeatureRowProps) => {
    return (
        <View style={[{ flexDirection: 'row', width: '100%', }, style]} {...rest}>{children}</View>
    )
}