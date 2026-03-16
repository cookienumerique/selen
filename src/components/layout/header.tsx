import { Text } from '@/src/components/texts';
import { Colors } from '@/src/constants/theme';
import { Entypo } from '@expo/vector-icons';
import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
type HeaderProps = {
  onGoBack?: () => void;
};
export function Header(props: HeaderProps) {
  const { onGoBack } = props;

  const handleGoBack = () => {
    onGoBack?.();
  };

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        justifyContent: 'space-between',
      }}
    >
      {!!onGoBack && (
        <TouchableOpacity
          onPress={handleGoBack}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'white',
            borderRadius: 100,
            height: 50,
            width: 50,
          }}
        >
          <Entypo name="chevron-left" size={20} color="gray" />
        </TouchableOpacity>
      )}
      <View style={{ flex: 1 }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 8,
            backgroundColor: Colors.slateRoot,
            borderRadius: 100,
            paddingHorizontal: 6,
            paddingVertical: 6,
            paddingRight: 25,
            alignSelf: 'center',
          }}
        >
          <Image
            source={require('@/assets/images/logo_selen_512.png')}
            resizeMode="cover"
            style={{
              width: 36,
              height: 36,
            }}
          />
          <Text
            style={{
              color: 'white',
              fontSize: 18,
              fontWeight: 'thin',
              textTransform: 'uppercase',
              letterSpacing: 3,
            }}
          >
            Selen
          </Text>
        </View>
      </View>
    </View>
  );
}
