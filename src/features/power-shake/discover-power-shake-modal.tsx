import { Button } from '@/src/components/button';
import { Text } from '@/src/components/texts';
import { Colors } from '@/src/constants/theme';
import React, { useEffect } from 'react';
import { Modal, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
type DiscoverPowerShakeModalProps = {
  visible: boolean;
  onClose: () => void;
};

export default function DiscoverPowerShakeModal({
  visible,
  onClose,
}: DiscoverPowerShakeModalProps) {
  const translateX = useSharedValue(0);
  const rotate = useSharedValue(0);

  useEffect(() => {
    if (!visible) return;

    const rotateSequence = withSequence(
      withTiming(-3, { duration: 120 }),
      withTiming(3, { duration: 120 }),
      withTiming(-2, { duration: 120 }),
      withTiming(2, { duration: 120 }),
      withTiming(0, { duration: 150 }),
      withTiming(0, { duration: 2000 }),
    );

    rotate.value = withDelay(
      2000, // ⏳ attend 2 secondes avant de démarrer
      withRepeat(rotateSequence, -1, false),
    );
  }, [rotate, translateX, visible]);

  const animatedPhoneStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotate.value}deg` }],
  }));
  return (
    <Modal visible={visible} transparent animationType="none">
      <View
        style={{
          paddingVertical: 48,
          paddingHorizontal: 16,
          backgroundColor: Colors.slateRoot,
          flex: 1,
          alignItems: 'center',
        }}
      >
        <View
          style={{
            flex: 1,
            gap: 24,
            alignItems: 'center',
            justifyContent: 'center',
            padding: 16,
          }}
        >
          <Animated.Image
            source={require('@/assets/images/phone-selen.png')}
            style={[
              {
                width: 150,
                height: 150,
                resizeMode: 'contain',
              },
              animatedPhoneStyle,
            ]}
          />
          <View style={{ gap: 32 }}>
            <View
              style={{
                borderWidth: 1,
                borderColor: 'white',
                borderRadius: 24,
                paddingHorizontal: 12,
                paddingVertical: 4,
                width: 'auto',
                alignSelf: 'flex-start',
                backgroundColor: Colors.sateRootLight,
              }}
            >
              <Text style={{ color: 'white', fontSize: 12 }}>
                Découvre le power shake
              </Text>
            </View>
            <View>
              <Text
                style={{
                  color: Colors.linenCloud,
                  fontSize: 38,
                  fontWeight: 'normal',
                }}
              >
                <Text style={{ fontStyle: 'italic', fontWeight: 'bold' }}>
                  Shake
                </Text>{' '}
                ton téléphone.
              </Text>
              <Text style={{ color: Colors.linenCloud, fontSize: 24 }}>
                Juste ça.
              </Text>
            </View>
            <View>
              <Text style={{ color: 'white', fontSize: 12 }}>
                Le <Text style={{ fontWeight: 'bold' }}>power shake</Text> est
                là . Quand la tête tourne trop vite, secoue.
              </Text>
              <Text style={{ color: 'white', fontSize: 12 }}>
                <Text style={{ fontWeight: 'bold' }}>
                  3 cycles de respiration
                </Text>{' '}
                guidé, puis{' '}
                <Text style={{ fontWeight: 'bold' }}>un message</Text> pour
                repartir.
              </Text>
            </View>
          </View>
        </View>

        <Button
          style={{
            backgroundColor: Colors.linenCloud,
            width: '100%',
            marginTop: 'auto',
          }}
          onPress={onClose}
        >
          <Text>J&apos;ai compris</Text>
        </Button>
      </View>
    </Modal>
  );
}
