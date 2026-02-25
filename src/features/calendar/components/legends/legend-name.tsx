import { Text } from '@/src/components/texts';
import { Colors } from '@/src/constants/theme';

export const LegendName = ({ name }: { name: string }) => {
  return (
    <Text
      style={{
        fontSize: 12,
        color: Colors.oakHoneyDark,
        textAlign: 'left',
        flexShrink: 1,
      }}
    >
      {name}
    </Text>
  );
};
