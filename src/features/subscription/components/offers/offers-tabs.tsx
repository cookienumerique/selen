import { Button } from "@/src/components/button";
import { Text } from "@/src/components/texts";
import { Colors } from "@/src/constants/theme";
import { ComparisonFeatures } from "@/src/features/subscription/components/comparison-feature.tsx/comparison-features";
import { ConfirmModal } from "@/src/features/subscription/components/confirm-modal";
import { OfferButton } from "@/src/features/subscription/components/offers/offer-button";
import { SubscriptionBasePlanId, useSubscriptionIap } from "@/src/features/subscription/hooks/use-subscription-iap";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { ActivityIndicator, View } from "react-native";

export const OffersTabs = () => {
    const { buy, isLoading } = useSubscriptionIap();
    const [basePlan, setBasePlan] = useState<SubscriptionBasePlanId>('selen-premium-monthly');
    const isMonthlyTab = basePlan === 'selen-premium-monthly';
    const [openConfirmationModal, setOpenConfirmationModal] = useState<boolean>(false);
    const priceMonthly = 9.90;
    const priceMonthlyDiscount = 6.99;
    const priceMonthlyPercentageDiscount = Math.ceil(100 - ((priceMonthlyDiscount / priceMonthly) * 100)).toFixed(0);

    const priceYearly = 89.90;
    const priceYearlyDiscount = 59.90;
    const priceYearlyMonthlyDiscount = priceYearlyDiscount / 12;
    const priceYearlyDailyDiscount = priceYearlyDiscount / 365;

    const handleSubscribe = async () => {
        if (isMonthlyTab) {
            setOpenConfirmationModal(true)
        } else {
            await buy('selen-premium-yearly')
        }
    };

    return (
        <View style={{ backgroundColor: 'rgba(0, 0, 0, 0.40)', padding: 16, borderRadius: 16, gap: 16 }}>
            <View style={{ flexDirection: 'row', gap: 8 }}>
                <OfferButton isActive={isMonthlyTab} onPress={() => setBasePlan('selen-premium-monthly')} label="Mensuel" />
                <OfferButton isActive={!isMonthlyTab} onPress={() => setBasePlan('selen-premium-yearly')} label="Annuel" />
            </View>

            <View style={{ gap: 16 }}>
                <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                    <Text style={{ fontSize: 14, color: "white" }}>OFFRE MEMBRE PRIVILÈGE</Text>
                    <Text style={{ fontWeight: 'bold', fontSize: 48, color: Colors.warmSand }}>{`${isMonthlyTab ? `-${priceMonthlyPercentageDiscount}%` : '6 mois offerts'}`} </Text>
                    <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
                        <Ionicons name="sparkles" size={24} color="white" />
                        <Text style={{ fontWeight: 'bold', fontSize: 24, color: "white" }}>Selen infini {`${isMonthlyTab ? 'mensuel' : 'annuel'}`} </Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', gap: 16, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ color: "white", textDecorationLine: 'line-through', fontSize: 14, opacity: 0.9 }}>
                        {isMonthlyTab ? `${priceMonthly.toFixed(2)}€ / mois` : `${priceYearly.toFixed(2)}€ / an`}
                    </Text>
                    <Text style={{ color: "white", fontWeight: 'bold', fontSize: 18 }}>
                        {isMonthlyTab ? `${priceMonthlyDiscount.toFixed(2)}€ / mois` : `${priceYearlyDiscount.toFixed(2)}€ / an`}
                    </Text>
                </View>
                {!isMonthlyTab && (
                    <View style={{ gap: 4 }}>
                        <Text style={{ color: "white", fontWeight: 'bold', fontSize: 12, textAlign: 'center' }}>
                            Soit {priceYearlyMonthlyDiscount.toFixed(2)} € /mois, l&apos;équivalent de {priceYearlyDailyDiscount.toFixed(2)} € / jour seulement.
                        </Text>
                    </View>
                )}

                <ComparisonFeatures />

                <View style={{ gap: 16 }}>
                    <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center', justifyContent: 'center' }}>
                        <Ionicons name="shield-checkmark-outline" size={16} color="white" />
                        <Text style={{ fontSize: 12, color: 'white' }}>
                            Sans engagement. Annulez à tout moment.
                        </Text>
                    </View>
                    <Button onPress={handleSubscribe} disabled={isLoading} style={{ backgroundColor: Colors.warmSand }}>
                        {isLoading ? <ActivityIndicator size="small" color={Colors.slateRoot} /> : <Ionicons name="sparkles" size={18} color={Colors.slateRoot} />}
                        <Text style={{ color: Colors.slateRoot, fontWeight: 'bold', fontSize: 16 }}>{isMonthlyTab ? 'Activer mon accès infini' : 'Je profite des 6 mois offerts'}</Text>
                    </Button>

                </View>
            </View>
            <ConfirmModal visible={openConfirmationModal} onRequestClose={() => setOpenConfirmationModal(false)} />
        </View >
    )
}