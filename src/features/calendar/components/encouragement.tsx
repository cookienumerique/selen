import { Text } from '@/src/components/texts';
import { Colors } from '@/src/constants/theme';

export const Encouragement = () => {
  return (
    <Text
      style={{
        fontSize: 14,
        fontStyle: 'italic',
        color: Colors.oakHoneyDark,
        textAlign: 'center',
        fontWeight: 'bold',
      }}
    >
      Continue à prendre soin de toi ✨
    </Text>
  );
};
