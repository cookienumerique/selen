import { Colors } from '@/src/constants/theme';
import { Text } from 'react-native';
type CapsuleTitleProps = {
  title: string | null;
};

export const CapsuleTitle = ({ title }: CapsuleTitleProps) => {
  if (!title) return null;
  return (
    <Text
      style={{
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        color: Colors.slateRoot,
      }}
    >
      {title}
    </Text>
  );
};
