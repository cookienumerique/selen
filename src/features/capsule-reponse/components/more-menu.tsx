import { Menu } from '@/src/components/menu';
import { MenuItem } from '@/src/components/menu/menu-item';
import { Colors } from '@/src/constants/theme';
import { useSubscriptions } from '@/src/contexts/use-subscriptions';
import { Entypo } from '@expo/vector-icons';
import { Alert, Text } from 'react-native';

type MoreMenuProps = {
  onEdit: () => void;
  onDelete: () => void;
  setDisplayPremiumModal: (display: boolean) => void;
};

export const MoreMenu = ({
  onEdit,
  onDelete,
  setDisplayPremiumModal,
}: MoreMenuProps) => {
  const { hasActiveSubscription } = useSubscriptions();

  const handleEdit = () => {
    if (!hasActiveSubscription) {
      setDisplayPremiumModal(true);
      return;
    }
    onEdit();
  };

  const handleOpenConfirmationAlert = () => {
    if (!hasActiveSubscription) {
      setDisplayPremiumModal(true);
      return;
    }
    Alert.alert(
      'Supprimer la réponse de la capsule',
      'Souhaites-tu vraiment supprimer cette capsule ? Tu ne pourras pas revenir en arrière',
      [
        {
          text: 'Annuler',
          style: 'cancel',
        },
        {
          text: 'Supprimer',
          style: 'destructive',
          onPress: onDelete,
        },
      ],
      { cancelable: true },
    );
  };

  return (
    <Menu>
      <MenuItem onPress={handleEdit}>
        <Entypo name="pencil" size={16} color={Colors.oakHoneyDark} />
        <Text
          style={{
            fontSize: 16,
            color: Colors.oakHoneyDark,
          }}
        >
          Modifier
        </Text>
      </MenuItem>

      <MenuItem onPress={handleOpenConfirmationAlert}>
        <Entypo name="trash" size={16} color={Colors.red} />
        <Text
          style={{
            fontSize: 16,
            color: Colors.red,
            fontWeight: '600',
          }}
        >
          Supprimer
        </Text>
      </MenuItem>
    </Menu>
  );
};
