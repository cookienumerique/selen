import { Colors } from '@/src/constants/theme';
import { Entypo } from '@expo/vector-icons';
import React from 'react';
import { Pressable } from 'react-native';

type ShareButtonProps = {
  target: 'instagram' | 'facebook';
  onPress: (target: 'instagram' | 'facebook') => void;
}
export const ShareButton = (props: ShareButtonProps) => {
  const { target, onPress } = props;
  return (
    <Pressable
      onPress={() => onPress(target)}
    >
      {target === 'instagram' && <Entypo name="instagram" size={36} color={Colors.linenCloud} />}
      {target === 'facebook' && <Entypo name="facebook" size={36} color={Colors.linenCloud} />}
    </Pressable>
  );
};
