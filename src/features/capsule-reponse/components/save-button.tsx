import { Button } from '@/src/components/button';
import { Entypo } from '@expo/vector-icons';
import { ActivityIndicator, Text } from 'react-native';
type SaveButtonProps = {
  onPress: () => void;
  isLoading: boolean;
};
export const SaveButton = ({ onPress, isLoading }: SaveButtonProps) => {
  return (
    <Button style={{ flex: 1 }} onPress={onPress} disabled={isLoading}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <Entypo name="pencil" size={14} color="white" />
      )}

      <Text
        style={{
          fontSize: 14,
          color: 'white',
        }}
      >
        Enregistrer
      </Text>
    </Button>
  );
};
