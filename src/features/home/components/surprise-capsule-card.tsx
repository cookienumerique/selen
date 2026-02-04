import { Text } from '@/src/components/texts';
import { Colors } from '@/src/constants/theme';
import { HomeCard } from '@/src/features/home/components/home-card';
import { router } from 'expo-router';
import { Image, ImageBackground, TouchableOpacity, View } from 'react-native';

export const SurpriseCapsuleCard = () => {
  const handlePressOnSurpriseCapsule = () => {
    router.navigate('/capsule/open-capsule-screen');
  }
  return (
    <TouchableOpacity onPress={handlePressOnSurpriseCapsule} style={{ flex: 1, }}>
      <HomeCard
        style={{ width: '100%', padding: 0, borderRadius: 16, overflow: 'hidden' }}
      >
        <ImageBackground
          source={require('@/assets/images/surprise-capsule-background.png')}
          resizeMode="cover"
          style={{
            height: '100%',
            width: '100%',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <View style={{ flexDirection: 'column', padding: 16 }}>
            <Text
              style={{
                textAlign: 'left',
                fontSize: 14,
                color: Colors.oakHoneyDark,
              }}
            >
              Découvre ta capsule surprise
            </Text>
          </View>
          <Image
            source={require('@/assets/images/surprise-capsule.png')}
            style={{
              position: 'absolute',
              top: 45,
              alignSelf: 'center',
              width: 50,
              height: 50,
            }}
          />
        </ImageBackground>
      </HomeCard>
    </TouchableOpacity>
  );
};
