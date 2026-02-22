import { Text } from '@/src/components/texts';
import { Colors } from '@/src/constants/theme';
import { View } from 'react-native';

type FeatureItemTitleProps = {
  children: React.ReactNode;
  icon: React.ReactNode;
};

export const FeatureItemTitle = ({ children, icon }: FeatureItemTitleProps) => {
  return (
    <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
      {icon}
      <Text
        style={{ color: Colors.warmSand, fontSize: 18, fontWeight: 'bold' }}
      >
        {children}
      </Text>
    </View>
  );
};
