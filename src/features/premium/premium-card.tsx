import { Text } from '@/src/components/texts';
import { Colors } from '@/src/constants/theme';
import { ExploreInfinityButton } from '@/src/features/subscription/components/explor-infinity-button';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity, View } from "react-native";

type PremiumCardProps = {
    title: string;
    description: string;
    onClose?: () => void | null;
}

export const PremiumCard = ({ title, description, onClose }: PremiumCardProps) => {

    return (
        <View
            style={{
                alignItems: 'center',
                backgroundColor: '#fff',
                padding: 20,
                borderRadius: 20,
                // Ombre portée pour l'aspect Pro
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 10 },
                shadowOpacity: 0.1,
                shadowRadius: 20,
                elevation: 10,
                borderWidth: 1,
                borderColor: '#f0f0f0',
                gap: 16,

            }}
        >
            <View style={{ gap: 8, alignItems: 'center' }}>
                {onClose && (
                    <TouchableOpacity onPress={onClose} style={{ position: 'absolute', top: 0, right: 0 }}>
                        <Ionicons name="close" size={24} color={Colors.slateRoot} />
                    </TouchableOpacity>
                )}
                <Ionicons name="sparkles" size={24} color={Colors.gold} />
                <Text
                    style={{
                        fontWeight: '800',
                        color: '#1a1a1a',
                        fontSize: 16,
                        textAlign: 'center',
                        letterSpacing: 0.5,
                    }}
                >
                    {title}
                </Text>
                <Text
                    style={{
                        color: '#666',
                        fontSize: 14,
                        textAlign: 'center',
                        marginTop: 4,
                    }}
                >
                    {description}
                </Text>
            </View>
            <ExploreInfinityButton />
        </View>
    )
}