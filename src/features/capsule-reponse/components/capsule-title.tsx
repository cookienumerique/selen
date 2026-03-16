import { Text } from '@/src/components/texts';
import { Colors } from '@/src/constants/theme';

type CapsuleTitleProps = {
  title: string | null;
};

export const CapsuleTitle = ({ title }: CapsuleTitleProps) => {
  if (!title) return null;
  return (
    <Text
      family="seasons"
      variant="bold"
      style={{
        fontSize: 16,
        color: Colors.slateRoot,
      }}
    >
      {title}
    </Text>
  );
};
