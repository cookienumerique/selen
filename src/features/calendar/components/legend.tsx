import { Text } from '@/src/components/texts';
import { Colors } from '@/src/constants/theme';
import { View } from 'react-native';

export const Legend = () => {
  return (
    <View
      style={{
        flexDirection: 'row',
        padding: 8,
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: 8,
      }}
    >
      <View
        style={{
          width: 8,
          height: 8,
          backgroundColor: Colors.capsule,
          borderRadius: 100,
        }}
      />
      <Text
        style={{
          fontSize: 14,
          color: Colors.oakHoneyDark,
          textAlign: 'left',
        }}
      >
        capsule ouverte
      </Text>
    </View>
  );
};
