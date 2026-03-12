import { Button } from "@/src/components/button"
import { Text } from "@/src/components/texts"
import { Colors } from "@/src/constants/theme"
import { SubThemeCapsule } from "@/src/features/sub-theme-capsule/types/sub-theme-capsule.types"
import { Ionicons } from "@expo/vector-icons"
import { Modal, View } from "react-native"
type SubThemeCompletedModalProps = {
    visible: boolean
    onClose: () => void
    subThemeCapsule: SubThemeCapsule
}
export const SubThemeCompletedModal = ({ visible, onClose, subThemeCapsule }: SubThemeCompletedModalProps) => {
    return (
        <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
            <View
                style={{
                    flex: 1,
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <View
                    style={{
                        width: '85%',
                        padding: 16,
                        gap: 16,
                        borderRadius: 16,
                        backgroundColor: Colors.linenCloud,
                        alignItems: 'center',
                    }}
                >
                    <Text style={{ fontSize: 40 }}>🌙</Text>

                    <Text
                        family="seasons"
                        variant="bold"
                        style={{ fontSize: 20, color: Colors.slateRoot, textAlign: 'center' }}
                    >
                        Ce thème n&apos;a plus de secret pour toi.
                    </Text>
                    <Text
                        style={{ fontSize: 16, color: Colors.slateRoot, textAlign: 'center' }}
                    >
                        Il est temps de laisser ces graines pousser et d&apos;aller explorer de nouveaux horizons.
                    </Text>
                    <Button onPress={onClose} style={{ width: '100%', alignItems: 'center', gap: 8 }}>
                        <Text style={{ color: Colors.linenCloud }}>
                            Découvrir d&apos;autres thèmes
                        </Text>
                        <Ionicons name="arrow-forward" size={16} color={Colors.linenCloud} />
                    </Button>
                </View>
            </View>
        </Modal >
    )
}
