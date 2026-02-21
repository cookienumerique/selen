import { Text } from "@/src/components/texts";

type FeatureItemDescriptionProps = {
    children: React.ReactNode;
}

export const FeatureItemDescription = ({ children }: FeatureItemDescriptionProps) => {
    return (
        <Text style={{ color: "white", fontSize: 14, textAlign: 'left' }}>
            {children}
        </Text>
    )
}