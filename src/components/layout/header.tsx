import { Text } from '@/src/components/texts';
import { Colors } from '@/src/constants/theme';
import { Entypo } from '@expo/vector-icons';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
type HeaderProps = {
  onPress?: () => void;
  title: string;
};
export function Header({ onPress, title }: HeaderProps) {

  return (
    <View style={{
      width: '100%',
      backgroundColor: Colors.slateRoot,
      flexDirection: 'row',
      alignItems: 'center',
      padding: 8,
      paddingVertical: 16,
    }}>
      {onPress && (
        <TouchableOpacity
          onPress={onPress}
        >
          <Entypo name="chevron-left" size={30} color="white" />
        </TouchableOpacity>
      )}
      <Text
        family="seasons"
        style={{
          flex: 1,
          fontSize: 24,
          color: 'white',
          textAlign: 'center'
        }}
      >
        {title}
      </Text>
    </View>
  );
}
