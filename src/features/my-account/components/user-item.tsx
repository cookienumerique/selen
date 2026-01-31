import { Text } from '@/src/components/texts';
import { Colors } from '@/src/constants/theme';
import React from 'react';
import { View } from 'react-native';

export const UserItem = ({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          gap: 8,
          alignItems: 'center',
        }}
      >
        {icon}
        <Text
          style={{
            color: 'darkgray',
            fontWeight: 'regular',
          }}
        >
          {label}
        </Text>
      </View>
      <Text style={{ color: Colors.gray }}>{value}</Text>
    </View>
  );
};
