import { Colors } from '@/src/constants/theme';
import { Text } from 'react-native';
type CapsuleContentProps = {
  content: string;
};

export const CapsuleContent = ({ content }: CapsuleContentProps) => {
  return (
    <Text
      style={{
        fontSize: 18,
        textAlign: 'center',
        color: Colors.oakHoneyDark,
      }}
    >
      {content}
    </Text>
  );
};
