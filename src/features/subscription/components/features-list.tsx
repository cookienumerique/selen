import { Text } from "@/src/components/texts";
import { Colors } from "@/src/constants/theme";
import { FeatureItem } from "@/src/features/subscription/components/features/feature-item";
import { FeatureItemDescription } from "@/src/features/subscription/components/features/feature-item-description";
import { FeatureItemTitle } from "@/src/features/subscription/components/features/feature-item-title";
import { FeatureListContainer } from "@/src/features/subscription/components/features/feature-list-container";
import { FontAwesome, FontAwesome6, Ionicons } from "@expo/vector-icons";
import React from "react";

export const FeaturesList = () => {
    const iconColor = Colors.warmSand;
    return (
        <FeatureListContainer>
            <Text style={{ color: Colors.warmSand, fontSize: 24, fontWeight: 'bold', textAlign: 'center' }}>Tes nouveaux pouvoirs:</Text>
            <FeatureItem>
                <FeatureItemTitle icon={<Ionicons name="sunny-sharp" size={18} color={iconColor} />}>Météo intérieure:</FeatureItemTitle>
                <FeatureItemDescription>
                    Décode tes cycles émotionnels et visualise ton équilibre au fil des mois pour mieux te comprendre.
                </FeatureItemDescription>
            </FeatureItem>
            <FeatureItem>
                <FeatureItemTitle icon={<Ionicons name="sparkles" size={18} color={iconColor} />}>Ton Dialogue Quotidien :</FeatureItemTitle>
                <FeatureItemDescription>
                    Une nouvelle dose de clarté chaque matin, 365 jours par an, pour ne jamais perdre le fil de ton évolution.
                </FeatureItemDescription>
            </FeatureItem>
            <FeatureItem>
                <FeatureItemTitle icon={<FontAwesome name="book" size={18} color={iconColor} />}>Ton grimoire personnel :</FeatureItemTitle>
                <FeatureItemDescription>
                    Remonte le temps. Accède à toutes tes capsules passées pour mesurer le chemin parcouru et retrouver tes réfléxions et prises de conscience.
                </FeatureItemDescription>
            </FeatureItem>
            <FeatureItem>
                <FeatureItemTitle icon={<FontAwesome name="pencil" size={18} color={iconColor} />}>Liberté totale:</FeatureItemTitle>
                <FeatureItemDescription>
                    Modifie ou supprime tes capsules. Ton espace Selen s&apos;adapte à ta vérité du moment, sans compromis.
                </FeatureItemDescription>
            </FeatureItem>
            <FeatureItem>
                <FeatureItemTitle icon={<FontAwesome6 name="address-card" size={18} color={iconColor} />}>Ton pass privilège:</FeatureItemTitle>
                <FeatureItemDescription>
                    Bénéficie de -30% à vie sur tous les accompagnements payants.
                </FeatureItemDescription>
            </FeatureItem>
            <FeatureItem>
                <FeatureItemTitle icon={<FontAwesome6 name="scale-balanced" size={18} color={iconColor} />}>La balance de la gratitude (bientôt):</FeatureItemTitle>
                <FeatureItemDescription>
                    L&apos;outil visuel pour peser tes victoires face à tes freins. Visualise ta transformation en temps réel et va te coucher la tête plus légère.
                </FeatureItemDescription>
            </FeatureItem>
        </FeatureListContainer>
    )
}