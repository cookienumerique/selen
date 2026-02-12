import { Button } from '@/src/components/button';
import { Colors } from '@/src/constants/theme';
import { Text } from 'react-native';
type CancelButtonProps = {
  onPress: () => void;
};
export const CancelButton = ({ onPress }: CancelButtonProps) => {
  return (
    <Button
      style={{
        flex: 1,
        backgroundColor: 'white',
        borderWidth: 2,
        borderColor: Colors.oakHoneyDark,
      }}
      onPress={onPress}
    >
      <Text style={{ fontSize: 14, color: Colors.oakHoneyDark }}>Annuler</Text>
    </Button>
  );
};
