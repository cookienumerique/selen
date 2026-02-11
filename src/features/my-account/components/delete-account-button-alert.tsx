import { Text } from '@/src/components/texts';
import { Colors } from '@/src/constants/theme';
import { useUser } from '@/src/contexts/use-user';
import { useDeleteMe } from '@/src/features/auth/hooks/use-delete-me';
import { router } from 'expo-router';
import { ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import Toast from 'react-native-toast-message';

export const DeleteAccountButtonAlert = () => {
  const { user, logout } = useUser();

  const { mutate: deleteMe, isPending: isLoadingDeleteMe } = useDeleteMe({
    onSuccess: async () => {
      await logout();
      router.replace('/login-screen');
    },
    onError: (error) => {
      console.error(error);
      Toast.show({
        type: 'error',
        text1: 'Erreur lors de la suppression du compte',
        position: 'bottom',
        autoHide: false,
      });
    },
  });

  const handleDeleteAccount = () => {
    Alert.alert(
      'Confirmation de suppression de compte',
      'Cette action est irréversible. Toutes vos données, y compris vos réponses aux capsules et votre météo intérieure, seront définitivement supprimées.',
      [
        {
          text: 'Annuler',
          style: 'cancel',
        },
        {
          text: 'Supprimer',
          style: 'destructive',
          onPress: () => deleteMe(),
        },
      ],
      { cancelable: true },
    );
  };

  if (!user) return null;
  return (
    <TouchableOpacity
      style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}
      onPress={handleDeleteAccount}
      onPressIn={handleDeleteAccount}
    >
      {isLoadingDeleteMe && <ActivityIndicator size="small" color="white" />}
      <Text style={{ color: Colors.red }}>Supprimer mon compte</Text>
    </TouchableOpacity>
  );
};
