import { Text } from "@/src/components/texts";
import { Colors } from "@/src/constants/theme";
import { CheckIcon } from "@/src/features/subscription/components/comparison-feature.tsx/check-icon";
import { ComparisonFeatureCell } from "@/src/features/subscription/components/comparison-feature.tsx/cell";
import { ComparisonFeatureRow } from "@/src/features/subscription/components/comparison-feature.tsx/row";
import { ComparisonFeatureTable } from "@/src/features/subscription/components/comparison-feature.tsx/table";
import { UnCheckIcon } from "@/src/features/subscription/components/comparison-feature.tsx/uncheck-icon";
import React from "react";
import { TextStyle, View, ViewStyle } from "react-native";

export const ComparisonFeatures = () => {
    const designationWidth = '70%';
    const featureWidth = '15%';

    const designationTextStyle: TextStyle = { fontSize: 14, fontWeight: 'bold', color: "white" };
    const designationViewStyle: ViewStyle = { width: designationWidth, alignItems: 'flex-start' };
    return (
        <ComparisonFeatureTable>
            <ComparisonFeatureRow>
                <ComparisonFeatureCell style={{ width: designationWidth }}>
                    <View />
                </ComparisonFeatureCell>
                <ComparisonFeatureCell style={{ width: featureWidth }}>
                    <Text style={{ fontSize: 12, color: Colors.warmSand, fontWeight: 'bold', padding: 4, textAlign: 'center' }}>
                        Gratuit
                    </Text>
                </ComparisonFeatureCell>
                <ComparisonFeatureCell style={{ width: featureWidth }}>
                    <Text style={{ fontSize: 12, color: Colors.slateRoot, fontWeight: 'bold', backgroundColor: Colors.warmSand, borderRadius: 8, padding: 4, textAlign: 'center', width: '100%' }}>Infini</Text>
                </ComparisonFeatureCell>
            </ComparisonFeatureRow>
            <ComparisonFeatureRow>
                <ComparisonFeatureCell style={designationViewStyle}>
                    <Text style={designationTextStyle}>Nb de capsules par semaine</Text>
                </ComparisonFeatureCell>
                <ComparisonFeatureCell style={{ width: featureWidth, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 14, fontWeight: 'bold', color: Colors.warmSand }}>3</Text>
                </ComparisonFeatureCell>
                <ComparisonFeatureCell style={{ width: featureWidth, alignItems: 'center', backgroundColor: 'rgba(245, 227, 200, 0.25)' }}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold', color: Colors.warmSand }}>7</Text>
                </ComparisonFeatureCell>
            </ComparisonFeatureRow>
            <ComparisonFeatureRow>
                <ComparisonFeatureCell style={designationViewStyle}>
                    <Text style={designationTextStyle}>Historique disponible</Text>
                </ComparisonFeatureCell>
                <ComparisonFeatureCell style={{ width: featureWidth, alignItems: 'center', justifyContent: 'center' }}>
                    <UnCheckIcon />
                </ComparisonFeatureCell>
                <ComparisonFeatureCell style={{ width: featureWidth, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(245, 227, 200, 0.25)' }}>
                    <CheckIcon />
                </ComparisonFeatureCell>
            </ComparisonFeatureRow>
            <ComparisonFeatureRow>
                <ComparisonFeatureCell style={designationViewStyle}>
                    <Text style={designationTextStyle}>Modification et suppression des capsules</Text>
                </ComparisonFeatureCell>
                <ComparisonFeatureCell style={{ width: featureWidth, alignItems: 'center', justifyContent: 'center' }}>
                    <UnCheckIcon />
                </ComparisonFeatureCell>
                <ComparisonFeatureCell style={{ width: featureWidth, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(245, 227, 200, 0.25)' }}>
                    <CheckIcon />
                </ComparisonFeatureCell>
            </ComparisonFeatureRow>
            <ComparisonFeatureRow>
                <ComparisonFeatureCell style={designationViewStyle}>
                    <Text style={designationTextStyle}>Balance de la gratitude</Text>
                </ComparisonFeatureCell>
                <ComparisonFeatureCell style={{ width: featureWidth, alignItems: 'center', justifyContent: 'center' }}>
                    <UnCheckIcon />
                </ComparisonFeatureCell>
                <ComparisonFeatureCell style={{ width: featureWidth, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(245, 227, 200, 0.25)', borderBottomEndRadius: 8, borderBottomLeftRadius: 8 }}>
                    <CheckIcon />
                </ComparisonFeatureCell>
            </ComparisonFeatureRow>
        </ComparisonFeatureTable >
    )
}