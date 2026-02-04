import HomeButton from '@/src/components/button/home-button';
import { Colors } from '@/src/constants/theme';
import { Image, Text, View } from 'react-native';

export default function NoCapsuleAvailable() {
  return (
    <>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          gap: 64,
        }}
      >
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 64,
          }}
        >
          <Image
            source={require('@/assets/images/capsule.png')}
            style={{
              width: 250,
              height: 100,
              resizeMode: 'contain',
            }}
          />
        </View>
        <Text
          style={{
            fontSize: 24,
            fontWeight: 'bold',
            color: Colors.slateRoot,
            textAlign: 'center',
          }}
        >
          Aucune capsule disponible pour le moment.
        </Text>
        <Text
          style={{
            fontSize: 20,
            color: Colors.oakHoneyDark,
            textAlign: 'center',
            fontStyle: 'italic',
          }}
        >
          Tu as répondu à toutes les capsules de ce thème.
        </Text>
      </View>
      <HomeButton />
    </>
  );
}
