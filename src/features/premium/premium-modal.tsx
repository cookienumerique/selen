import { Button } from '@/src/components/button';
import { Text } from '@/src/components/texts';
import { Colors } from '@/src/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View } from "react-native";
type PremiumModalProps = {
    title: string;
    description: string;
    onClose?: () => void;
    isOpen: boolean;
}
export const PremiumModal = ({ title, description, onClose, isOpen }: PremiumModalProps) => {
    if (!isOpen) return null;
    return (
        <View
            style={[
                StyleSheet.absoluteFill,
                {
                    zIndex: 10,
                    // On crée un effet de verre dépoli avec une couleur très claire et opaque
                    backgroundColor: 'rgba(255, 255, 255, 0.50)',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 20,
                },
            ]}
        >
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
                <Button onPress={onClose}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, justifyContent: 'center', width: '100%' }}>
                        <Ionicons name="sparkles" size={12} color="white" />
                        <Text style={{ color: 'white' }}>
                            Explorer l&apos;infini
                        </Text>
                    </View>
                </Button>
            </View>
        </View>
    )
}