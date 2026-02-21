import { View } from "react-native";
type FeatureListContainerProps = {
    children: React.ReactNode;
}

export const FeatureListContainer = ({ children }: FeatureListContainerProps) => {
    return (
        <View style={{ backgroundColor: 'rgba(0, 0, 0, 0.40)', padding: 16, borderRadius: 16, gap: 16 }}>
            {children}
        </View>
    )
}