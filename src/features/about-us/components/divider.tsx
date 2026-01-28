import { Colors } from '@/src/constants/theme';
import React from 'react';
import { View } from 'react-native';
import { Divider as PaperDivider } from 'react-native-paper';
const Round = () => (
  <View
    style={{
      width: 4,
      height: 4,
      borderRadius: 100,
      backgroundColor: Colors.sageMist,
    }}
  />
);

export const Divider = () => (
  <View
    style={{
      flexDirection: 'row',
      width: 200,
      alignItems: 'center',
      alignSelf: 'center',
      opacity: 0.8,
    }}
  >
    <Round />
    <PaperDivider
      style={{
        width: '100%',
        marginHorizontal: 'auto',
        backgroundColor: Colors.sageMist,
        height: 1,
      }}
    />
    <Round />
  </View>
);
