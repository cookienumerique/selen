import { LegendDot } from '@/src/features/calendar/components/legends/legend-dot';
import { LegendName } from '@/src/features/calendar/components/legends/legend-name';
import { View } from 'react-native';
export const LegendItem = ({
  color,
  name,
}: {
  color: string;
  name: string;
}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: 8,
        flexBasis: '48%',
      }}
    >
      <LegendDot color={color} />
      <LegendName name={name} />
    </View>
  );
};
