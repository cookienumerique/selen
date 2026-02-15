import { PremiumCard } from '@/src/features/premium/premium-card';
import { Modal, View } from "react-native";
type PremiumModalProps = {
    title: string;
    description: string;
    onClose?: () => void | null;
    isOpen: boolean;
}
export const PremiumModal = ({ title, description, onClose, isOpen }: PremiumModalProps) => {

    return (
        <Modal visible={isOpen} transparent={true} animationType="fade">
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    padding: 24,
                }}
            >
                <PremiumCard title={title} description={description} onClose={onClose} />
            </View>
        </Modal >
    )
}